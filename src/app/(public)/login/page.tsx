import LoginForm from '@/app/(public)/login/login-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function LoginPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Đăng nhập</CardTitle>
        <CardDescription>Chứng minh bạn là người của tôi</CardDescription>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
    </Card>
  );
}
