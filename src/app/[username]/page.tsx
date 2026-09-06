import userApiRequests from '@/api-requests/user';
import EditProfileDialog from '@/app/[username]/edit-profile-dialog';
import PageContainer from '@/components/page-container';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { formatFullDate } from '@/lib/date';

type ParamsType = Promise<{ username: `@${string}` }>;

export default async function ProfilePage({ params }: { params: ParamsType }) {
  const { username } = await params;
  const realUsername = username.split(encodeURIComponent('@'))[1];

  const user = await userApiRequests.sGetUserByUsername(realUsername);

  if (!user) {
    return 'User not found';
  }

  return (
    <PageContainer size="sm">
      <div className="mx-auto flex h-20 items-center justify-between px-6">
        <h3 className="text-xl font-bold tracking-tight">{realUsername}</h3>
      </div>

      <div className="mx-auto px-4">
        <Card className="overflow-hidden">
          <div className="px-12 pt-5">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold leading-tight tracking-tight">{user.name}</h2>
                <p className="text-base mt-1">{user.username}</p>
              </div>

              <Avatar className="size-21 border">
                <AvatarImage src="https://github.com/shadcn.png" alt={user.name} />
                <AvatarFallback className="bg-white/10 text-2xl">DA</AvatarFallback>
              </Avatar>
            </div>

            {user.bio ? (
              <p className="text-base">{user.bio}</p>
            ) : (
              <p className="text-base text-muted-foreground">Chưa có tiểu sử</p>
            )}

            <div className="mt-3 flex items-center gap-4">
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  {[
                    'https://github.com/shadcn.png',
                    'https://github.com/shadcn.png',
                    'https://github.com/shadcn.png',
                  ].map((src, index) => (
                    <Avatar key={src + index} size="sm" className="border-2 border-[#101010]">
                      <AvatarImage src={src} />
                      <AvatarFallback>{index + 1}</AvatarFallback>
                    </Avatar>
                  ))}
                </div>

                <span className="text-base text-muted-foreground">13 followers</span>
              </div>
              <span className="text-muted-foreground">|</span>
              <div className="flex items-center gap-4">
                <span className="text-base text-muted-foreground">
                  Tham gia từ {formatFullDate(user.createdAt)}
                </span>
              </div>
            </div>

            <EditProfileDialog user={user} />
          </div>
        </Card>
      </div>
    </PageContainer>
  );
}
