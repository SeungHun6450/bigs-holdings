import { ReactNode, Suspense } from "react";

type Props = { children: ReactNode };

export default function BoardDetailLayout({ children }: Props) {
  return <Suspense>{children}</Suspense>;
}
