import { ReactNode, Suspense } from "react";

type Props = { children: ReactNode };

export default function BoardModifyLayout({ children }: Props) {
  return <Suspense>{children}</Suspense>;
}
