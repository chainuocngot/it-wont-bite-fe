'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import z from 'zod';

import authApiRequests from '@/api-requests/auth';
import { Button } from '@/components/ui/button';
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/toast';

const loginBodySchema = z.object({
  email: z.email({
    error: 'Email không hợp lệ.',
  }),
  pwd: z.string().nonempty({
    error: 'Vui lòng nhập mật khẩu',
  }),
});

export default function LoginForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof loginBodySchema>>({
    resolver: zodResolver(loginBodySchema),
    defaultValues: {
      email: '',
      pwd: '',
    },
  });

  async function onSubmit(data: z.infer<typeof loginBodySchema>) {
    await toast.promise(authApiRequests.cLogin(data), {
      loading: 'Đang đăng nhập...',
      success: 'Đăng nhập thành công!',
      error: 'Đăng nhập thất bại',
    });

    router.push('/');
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                {...field}
                id="email"
                type="email"
                aria-invalid={fieldState.invalid}
                autoComplete="off"
                required
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="pwd"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="pwd">Mật khẩu</FieldLabel>
              <Input
                {...field}
                id="pwd"
                type="password"
                aria-invalid={fieldState.invalid}
                autoComplete="off"
                required
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <FieldGroup>
          <Field>
            <Button type="submit">Đăng nhập</Button>
            <Button variant="outline" type="button">
              Tiếp tục với Google
            </Button>
            <FieldDescription className="px-6 text-center">
              Chưa có tài khoản? <Link href="/register">Tạo tài khoản</Link>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </FieldGroup>
    </form>
  );
}
