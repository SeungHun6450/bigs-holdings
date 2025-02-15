import { ReactNode, Suspense } from "react";

type Props = { children: ReactNode };

export default function BoardRegisterLayout({ children }: Props) {
  return <Suspense>{children}</Suspense>;
}
