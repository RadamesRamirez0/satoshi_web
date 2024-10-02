cd /home/apps/satoshi_web
git pull
pnpm install
pnpm build
pm2 delete "satoshi_web"
pm2 start pnpm --name "satoshi_web" -- start
