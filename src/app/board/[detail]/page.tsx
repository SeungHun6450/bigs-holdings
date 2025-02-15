import BoardDetail from "@/app/board/_components/BoardDetail";

const page = ({ params }: { params: { detail: string } }) => {
  const { detail } = params;
  return <BoardDetail detail={detail} />;
};

export default page;
