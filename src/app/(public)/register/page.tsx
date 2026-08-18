import RegisterForm from '@/app/(public)/register/register-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function RegisterPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tạo tài khoản</CardTitle>
        <CardDescription>Nhập thông tin bên dưới để tạo tài khoản của riêng bạn</CardDescription>
      </CardHeader>
      <CardContent>
        <RegisterForm />
      </CardContent>
    </Card>
  );
}
