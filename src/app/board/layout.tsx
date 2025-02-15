import { ReactNode, Suspense } from "react";

type Props = { children: ReactNode };

export default function BoardLayout({ children }: Props) {
  return <Suspense>{children}</Suspense>;
}
