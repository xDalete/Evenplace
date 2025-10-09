import CustomLink from "@/components/common/CustomLink";

export default function Home() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        padding: "20px"
      }}
    >
      <h1>Hello, Evenplace!</h1>
      <CustomLink href="/login">Login</CustomLink>
      <CustomLink href="/colors">Colors</CustomLink>
      <CustomLink href="/dashboard">Dashboard</CustomLink>
    </div>
  );
}
