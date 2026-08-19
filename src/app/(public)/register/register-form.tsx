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
import { handleApiError } from '@/lib/utils';

const registerBodySchema = z
  .object({
    name: z.string().min(5, 'Tên phải có ít nhất 5 ký tự.').max(100, 'Tên tối đa 100 ký tự.'),
    username: z
      .string()
      .min(5, 'Username phải có ít nhất 5 ký tự.')
      .max(100, 'Tên tối đa 100 ký tự.'),
    email: z.email({
      error: 'Email không hợp lệ.',
    }),
    pwd: z
      .string()
      .min(8, 'Mật khẩu phải có ít nhất 8 ký tự.')
      .max(64, 'Mật khẩu tối đa 64 ký tự.')
      .regex(/[a-z]/, 'Mật khẩu phải chứa ít nhất 1 chữ thường.')
      .regex(/[A-Z]/, 'Mật khẩu phải chứa ít nhất 1 chữ hoa.')
      .regex(/[0-9]/, 'Mật khẩu phải chứa ít nhất 1 chữ số.')
      .regex(/[^a-zA-Z0-9]/, 'Mật khẩu phải chứa ít nhất 1 ký tự đặc biệt.'),
    cf_pwd: z.string(),
  })
  .refine((data) => data.pwd === data.cf_pwd, {
    error: 'Mật khẩu xác nhận không khớp.',
    path: ['cf_pwd'],
  });

export default function RegisterForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof registerBodySchema>>({
    resolver: zodResolver(registerBodySchema),
    defaultValues: {
      name: '',
      username: '',
      email: '',
      pwd: '',
      cf_pwd: '',
    },
  });

  async function onSubmit(data: z.infer<typeof registerBodySchema>) {
    try {
      await toast.promise(authApiRequests.cRegister(data), {
        loading: 'Đang tạo tài khoản...',
        success: 'Tạo tài khoản thành công!',
        error: 'Tạo tài khoản thất bại',
      });

      router.push('/');
    } catch (error) {
      handleApiError(error, form.setError);
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="name">Họ tên</FieldLabel>
              <Input
                {...field}
                id="name"
                aria-invalid={fieldState.invalid}
                placeholder="Lung Thị Linh"
                autoComplete="off"
                required
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="username"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="username">Username</FieldLabel>
              <Input
                {...field}
                id="username"
                aria-invalid={fieldState.invalid}
                autoComplete="off"
                required
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
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
                placeholder="m@gmail.com"
                autoComplete="off"
                required
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              <FieldDescription>
                Tôi sẽ sử dụng địa chỉ Email này để liên lạc với bạn. Hứa không chia sẻ linh tinh
              </FieldDescription>
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
        <Controller
          name="cf_pwd"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="cf_pwd">Nhập lại mật khẩu</FieldLabel>
              <Input
                {...field}
                id="cf_pwd"
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
            <Button type="submit">Tạo tài khoản</Button>
            <Button variant="outline" type="button">
              Tiếp tục với Google
            </Button>
            <FieldDescription className="px-6 text-center">
              Đã có tài khoản? <Link href="/login">Đăng nhập</Link>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </FieldGroup>
    </form>
  );
}
