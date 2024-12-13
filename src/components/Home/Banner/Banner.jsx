import girlHeadphones from "@/assets/images/girl_headphones.png";
import "./Banner.css";

const Banner = () => {
  return (
    <div className="sub-container">
      <div className="banner">
        <div className="banner-text">
          <h1>
          ¡Hola! ¡Tu próxima gran compra está a solo un clic! <br></br> 
          </h1>
          <span className="is-buy-now">
            <a href="#products">
              <button className="btn-rounded buy-now">Compra Ahora</button>
            </a>
          </span>
        </div>
        <div className="subject">
        <img
          src="https://vivirenelpoblado.com/wp-content/uploads/2023/07/Estudiantes-universitarios-de-Colombia-pueden-inscribirse-en-el-programa-Jovenes-en-Accion-.jpg"
          alt="Estudiantes universitarios"
          style={{ width: "100%" }}
  />
</div>

      </div>
    </div>
  );
};
export default Banner;
