
import { useState } from 'react';
import ServicePage from '@/components/ServicePage';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Heart, Wand2, RefreshCw, Check } from 'lucide-react';

const DomainAI = () => {
  const [keywords, setKeywords] = useState('');
  const [industry, setIndustry] = useState('');
  const [description, setDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [suggestions, setSuggestions] = useState<{ name: string; available: boolean; price: string }[]>([]);
  
  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    
    setTimeout(() => {
      setIsGenerating(false);
      setSuggestions([
        { name: 'techbuild.com', available: true, price: '$12.99/yr' },
        { name: 'innovateapp.io', available: true, price: '$39.99/yr' },
        { name: 'developnow.tech', available: true, price: '$21.99/yr' },
        { name: 'codecraft.dev', available: true, price: '$15.99/yr' },
        { name: 'bytesphere.net', available: true, price: '$11.99/yr' },
        { name: 'devmotion.co', available: true, price: '$24.99/yr' },
        { name: 'techharbor.io', available: true, price: '$39.99/yr' },
        { name: 'codeflow.app', available: true, price: '$17.99/yr' },
      ]);
    }, 2000);
  };
  
  return (
    <ServicePage
      title="AI Domain Generator"
      description="Let our AI find the perfect domain name for your business or project."
      ctaTitle="Found Your Perfect Domain?"
      ctaDescription="Register it now before someone else does!"
      ctaButtonText="Register Domain"
      ctaButtonLink="/domain-search"
    >
      <div className="max-w-3xl mx-auto">
        <Card className="p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Generate Domain Suggestions</h2>
          
          <form onSubmit={handleGenerate}>
            <div className="space-y-6">
              <div>
                <label htmlFor="keywords" className="block text-sm font-medium text-gray-700 mb-1">
                  Keywords (separated by commas)
                </label>
                <Input
                  id="keywords"
                  type="text"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  placeholder="tech, software, development"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-1">
                  Industry
                </label>
                <Select value={industry} onValueChange={setIndustry}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="health">Health & Wellness</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="ecommerce">E-commerce</SelectItem>
                    <SelectItem value="entertainment">Entertainment</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Brief Description of Your Project
                </label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Tell us a bit about your business or project..."
                  rows={3}
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-domainBlue hover:bg-domainBlue-dark"
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <div className="flex items-center">
                    <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
                    <span>Generating Suggestions...</span>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Wand2 className="mr-2 h-5 w-5" />
                    <span>Generate Domain Suggestions</span>
                  </div>
                )}
              </Button>
            </div>
          </form>
        </Card>
        
        {suggestions.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-6">AI-Generated Domain Suggestions</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {suggestions.map((domain, index) => (
                <Card key={index} className="p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{domain.name}</h3>
                      <p className="text-domainBlue font-medium">{domain.price}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button size="sm" className="bg-domainBlue hover:bg-domainBlue-dark">
                        <Check className="h-4 w-4 mr-1" />
                        <span>Select</span>
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <Button className="bg-domainBlue hover:bg-domainBlue-dark">
                <RefreshCw className="mr-2 h-4 w-4" />
                <span>Generate More Suggestions</span>
              </Button>
            </div>
          </div>
        )}
        
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-50 text-domainBlue rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                1
              </div>
              <h3 className="font-semibold mb-2">Tell Us About Your Project</h3>
              <p className="text-gray-600">
                Enter keywords, industry, and a brief description of your business or project.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-50 text-domainBlue rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                2
              </div>
              <h3 className="font-semibold mb-2">Our AI Creates Suggestions</h3>
              <p className="text-gray-600">
                Our advanced AI analyzes your inputs and generates relevant, creative domain suggestions.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-50 text-domainBlue rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                3
              </div>
              <h3 className="font-semibold mb-2">Choose Your Favorite</h3>
              <p className="text-gray-600">
                Browse the suggestions, select your favorite, and register it instantly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ServicePage>
  );
};

export default DomainAI;
