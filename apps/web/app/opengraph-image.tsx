import { ImageResponse } from "next/og";

export const alt = "Rei das Vendas — Tecnologia e IA para negócios locais";
export const size = { width:1200, height:630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(<div style={{ width:"100%", height:"100%", display:"flex", flexDirection:"column", justifyContent:"center", padding:"72px", background:"radial-gradient(circle at 20% 0%,#32230f 0%,#0a0a0a 45%)", color:"#f5f0e8" }}><div style={{ display:"flex", alignItems:"center", gap:"18px", fontSize:24, color:"#d4a853" }}><span style={{ border:"1px solid #d4a853", padding:"10px 12px" }}>RV</span>REI DAS VENDAS</div><div style={{ marginTop:60, maxWidth:920, fontSize:72, lineHeight:1.04, letterSpacing:"-2px" }}>Seu negócio deveria ser inesquecível.</div><div style={{ marginTop:28, fontSize:26, color:"#a89f8f" }}>Tecnologia + IA para negócios locais · Entrega no mesmo dia</div></div>, size);
}
