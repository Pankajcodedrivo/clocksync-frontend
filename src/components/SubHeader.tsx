interface AddProps {
  image: string;
  title:string;
  subtitle:string;
}
export default function Footer({image,title,subtitle}:AddProps) {
    return (
        <div className="text-center sub-hdr">
            <span><img src={image} alt="" /></span>
            <h5>{title}</h5>
            <p>{subtitle}</p>
        </div>
    )
}