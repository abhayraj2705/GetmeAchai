import Paymentpage from "@/components/Paymentpage";

export default async function Username({ params }) {
  const { username } = params; // Await is not needed in the page component

  return (
    <>
      <Paymentpage username={username} />
    </>
  );
}
