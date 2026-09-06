'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { Controller, useForm, useWatch } from 'react-hook-form';
import z from 'zod';

import EditSingleFieldDialog from '@/app/[username]/edit-single-field-dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Field, FieldError } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/toast';
import { handleApiError } from '@/lib/utils';
import { useUpdateMeMutation } from '@/queries/user';
import { ProjectedUserType } from '@/schemas/models/user';

const updateMeBodySchema = z.object({
  name: z
    .string()
    .min(5, 'Tên phải có ít nhất 5 ký tự.')
    .max(100, 'Tên tối đa 100 ký tự.')
    .optional(),
  username: z
    .string()
    .min(5, 'Username phải có ít nhất 5 ký tự.')
    .max(100, 'Username tối đa 100 ký tự.')
    .optional(),
  bio: z.string().max(500, 'Tiểu sử tối đa 500 ký tự.').optional(),
});

type EditProfileType = z.infer<typeof updateMeBodySchema>;

export default function EditProfileDialog({ user }: { user: ProjectedUserType }) {
  const router = useRouter();
  const { mutateAsync } = useUpdateMeMutation();

  const form = useForm<EditProfileType>({
    resolver: zodResolver(updateMeBodySchema),
    defaultValues: {
      name: user.name,
      username: user.username,
      bio: user.bio || '',
    },
  });

  const nameValue = useWatch({
    control: form.control,
    name: 'name',
  });
  const usernameValue = useWatch({
    control: form.control,
    name: 'username',
  });
  const bioValue = useWatch({
    control: form.control,
    name: 'bio',
  });

  async function onSubmit(data: EditProfileType) {
    try {
      await toast.promise(
        mutateAsync({
          userId: user.id,
          body: data,
        }),
        {
          loading: 'Đang chỉnh sửa thông tin tài khoản...',
          success: 'Chỉnh sửa thông tin tài khoản thành công!',
          error: 'Chỉnh sửa thông tin tài khoản thất bại',
        },
      );
      router.refresh();
    } catch (error) {
      handleApiError(error, form.setError);
    }
  }

  const hasEdited = Object.keys(form.formState.dirtyFields).length > 0;

  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button size="lg" variant="outline" className="mt-10 w-full">
            Sửa thông tin tài khoản
          </Button>
        }
      />
      <DialogContent size="lg">
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col items-stretch">
          <div className="flex items-center pb-3.5 border-b">
            <EditSingleFieldDialog
              field="Họ tên"
              fieldName="name"
              form={form}
              trigger={
                <div className="w-full flex flex-col items-start gap-1 cursor-pointer">
                  <b className="text-sm">Họ tên</b>
                  <div className="text-sm">{nameValue}</div>
                </div>
              }
            >
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <Input
                      {...field}
                      autoFocus
                      id="name"
                      aria-invalid={fieldState.invalid}
                      autoComplete="off"
                      className="ghost-input pl-3"
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            </EditSingleFieldDialog>
            <Avatar className="size-12 border cursor-pointer">
              <AvatarImage src="https://github.com/shadcn.png" alt={user.name} />
              <AvatarFallback className="bg-white/10 text-sm">DA</AvatarFallback>
            </Avatar>
          </div>

          <EditSingleFieldDialog
            field="Username"
            fieldName="username"
            form={form}
            trigger={
              <div className="w-full flex flex-col items-start gap-1 py-3.5 border-b cursor-pointer">
                <b className="text-sm">Username</b>
                <div className="text-sm">{usernameValue}</div>
              </div>
            }
          >
            <Controller
              name="username"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Input
                    {...field}
                    autoFocus
                    id="username"
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                    className="ghost-input pl-3"
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </EditSingleFieldDialog>

          <EditSingleFieldDialog
            field="Tiểu sử"
            fieldName="bio"
            form={form}
            trigger={
              <div className="w-full flex flex-col items-start gap-1 py-3.5 border-b cursor-pointer">
                <b className="text-sm">Tiểu sử</b>
                <div className="text-sm">{bioValue || 'Thêm tiểu sử'}</div>
              </div>
            }
          >
            <Controller
              name="bio"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Textarea
                    {...field}
                    autoFocus
                    id="bio"
                    placeholder="Thêm tiểu sử"
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                    className="ghost-input pl-3"
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </EditSingleFieldDialog>

          <DialogFooter>
            <DialogClose
              render={
                <Button size="lg" className="w-full" type={hasEdited ? 'submit' : 'button'}>
                  Xong
                </Button>
              }
            />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
