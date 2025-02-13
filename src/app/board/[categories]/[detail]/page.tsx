import BoardDetail from "@/components/Board/BoardDetail";

const page = ({
  params,
}: {
  params: { categories: string; detail: string };
}) => {
  const { detail } = params;
  return <BoardDetail detail={detail} />;
};

export default page;
