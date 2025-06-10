
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { corsHeaders } from '../_shared/cors.ts';

// Domain search edge function
Deno.serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get the request body
    const { domain, extensions } = await req.json();
    
    // Check if domain and extensions are provided
    if (!domain) {
      return new Response(
        JSON.stringify({ error: 'Domain name is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    if (!extensions || !Array.isArray(extensions) || extensions.length === 0) {
      return new Response(
        JSON.stringify({ error: 'At least one extension is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Processing domain search for: ${domain} with extensions: ${extensions.join(', ')}`);

    // Get Supabase admin client from environment
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Get domain API configuration with the updated schema
    const { data: apiConfigs, error: configError } = await supabase
      .from('api_configurations')
      .select('*')
      .eq('api_type', 'domain')
      .eq('integration_status', 'active')
      .order('created_at', { ascending: false })
      .limit(1);
    
    if (configError) {
      console.error('Error fetching API configuration:', configError);
    }
    
    let results = [];
    
    // If we have a domain API configuration, use it
    if (apiConfigs && apiConfigs.length > 0) {
      const apiConfig = apiConfigs[0];
      
      console.log(`Using ${apiConfig.provider} API for domain search`);
      
      // Here's where you would implement the actual API call to the domain registrar
      // This is a placeholder for demonstration purposes
      try {
        // Different implementation based on the provider
        switch(apiConfig.provider.toLowerCase()) {
          case 'godaddy':
            results = await searchDomainsWithGodaddy(domain, extensions, apiConfig.api_key, apiConfig.api_secret);
            break;
          case 'namecheap':
            results = await searchDomainsWithNamecheap(domain, extensions, apiConfig.api_key, apiConfig.api_secret);
            break;
          case 'resellerclub':
            results = await searchDomainsWithResellerClub(domain, extensions, apiConfig.api_key, apiConfig.api_secret);
            break;
          default:
            console.log(`Provider ${apiConfig.provider} not implemented yet, using mock data`);
            results = generateMockResults(domain, extensions);
        }
      } catch (apiError) {
        console.error(`Error calling ${apiConfig.provider} API:`, apiError);
        // Fall back to mock data if API fails
        results = generateMockResults(domain, extensions);
      }
    } else {
      console.log('No active domain API configuration found, using mock data');
      results = generateMockResults(domain, extensions);
    }
    
    // For authenticated users, store search history in database
    try {
      const authHeader = req.headers.get('authorization');
      
      if (supabaseUrl && supabaseKey && authHeader) {
        // Extract JWT token
        const token = authHeader.replace('Bearer ', '');
        
        try {
          // Verify the JWT and get user ID
          const { data: userData, error: userError } = await supabase.auth.getUser(token);
          
          if (!userError && userData?.user) {
            // Store search history for each extension
            const searchPromises = extensions.map(async (ext: string) => {
              const searchResult = results.find(r => r.domain === domain + ext);
              if (searchResult) {
                return supabase.from('domain_searches').insert({
                  domain_name: domain,
                  extension: ext,
                  available: searchResult.available,
                  user_id: userData.user.id
                });
              }
            });
            
            await Promise.all(searchPromises.filter(Boolean));
            console.log(`Stored search history for user ${userData.user.id}`);
          }
        } catch (authError) {
          console.error('Error authenticating user:', authError);
        }
      }
    } catch (dbError) {
      console.error('Error storing domain search history:', dbError);
    }
    
    // Return results
    return new Response(
      JSON.stringify({ results }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in domain-search function:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

// Generate mock domain results
function generateMockResults(domain: string, extensions: string[]) {
  return extensions.map((ext: string) => {
    // Deterministic availability based on domain name and extension
    const combined = domain + ext;
    const hash = Array.from(combined).reduce((sum, char) => sum + char.charCodeAt(0), 0);
    const available = hash % 10 > 3; // 60% chance of availability
    
    // Price determination based on extension and domain length
    let basePrice = 9.99;
    if (ext === '.io') basePrice = 39.99;
    else if (ext === '.org') basePrice = 12.99;
    else if (ext === '.net') basePrice = 11.99;
    else if (ext === '.ai') basePrice = 79.99;
    else if (ext === '.tech') basePrice = 34.99;
    else if (ext === '.app') basePrice = 14.99;
    
    const lengthFactor = Math.max(0.8, Math.min(1.5, 10 / domain.length));
    const price = Math.round((basePrice * lengthFactor) * 100) / 100;
    
    return {
      domain: domain + ext,
      available,
      price: available ? price : null
    };
  });
}

// Placeholder API implementation functions (to be implemented with real APIs)
async function searchDomainsWithGodaddy(domain: string, extensions: string[], apiKey: string, apiSecret?: string) {
  // This would contain the actual GoDaddy API implementation
  console.log(`GoDaddy API call for ${domain} with extensions: ${extensions.join(', ')}`);
  return generateMockResults(domain, extensions);
}

async function searchDomainsWithNamecheap(domain: string, extensions: string[], apiKey: string, apiSecret?: string) {
  // This would contain the actual Namecheap API implementation
  console.log(`Namecheap API call for ${domain} with extensions: ${extensions.join(', ')}`);
  return generateMockResults(domain, extensions);
}

async function searchDomainsWithResellerClub(domain: string, extensions: string[], apiKey: string, apiSecret?: string) {
  // This would contain the actual ResellerClub API implementation
  console.log(`ResellerClub API call for ${domain} with extensions: ${extensions.join(', ')}`);
  return generateMockResults(domain, extensions);
}
