
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const UserManagement = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">User Management</h2>
        <Button variant="outline">Refresh</Button>
      </div>
      
      <Card>
        <CardContent className="pt-6">
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">User management feature coming soon</p>
            <p className="text-sm text-muted-foreground">This section will allow you to manage users, roles, and permissions.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserManagement;
