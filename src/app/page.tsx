import CustomLink from "@/components/CustomLink";

export default function Home() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        height: "100vh",
        padding: "20px",
      }}
    >
      <h1 className="text-3xl font-bold underline">Hello, Evenplace!</h1>
      <CustomLink href="/login">Login</CustomLink>
      <CustomLink href="/colors">Colors</CustomLink>
    </div>
  );
}
