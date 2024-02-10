import PropTypes from "prop-types";

function SideBar({ logo, enterprise, title, name, options, rol }) {
  let colorBg = "#404242";
  let textColor = "[#fff]";
  let bgImg = "/bgImg.jpg";

  return (
    <>
      <div
        id="left-menu"
        className={`bg-[${colorBg}] w-[100%] h-dvh`}
        style={{
          backgroundImage: `url(${bgImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="bg-[#000] bg-opacity-70 h-[100%]">
          <div className="flex items-center py-[1rem] flex justify-center">
            <div className="w-[100px] flex justify-center">
              <img
                alt="logo"
                src={logo}
                className="w-[100%] h-[100%]"
              />
            </div>
            <h1 className={`text-${textColor} ml-[0.5rem] text-[20px]`}>
              {enterprise}
            </h1>
          </div>
          <hr className={`border-${textColor}`} />
          <div className="py-[1rem] flex flex-col items-center px-[2rem]">
            <h2 className={`text-${textColor} text-[20px]`}> {name} </h2>
            <h2 className={`text-${textColor} text-[15px]`}>{rol}</h2>
          </div>
          <hr className={`border-${textColor}`} />
          <div className="py-[1rem] px-[2rem]">
            <h2 className={`text-center text-${textColor}`}>{title}</h2>
            <div className="flex justify-center h-[20rem]">
              <div className="">
                {(options[rol] ?? []).map((opcion, key) => (
                  <div
                    key={key}
                    className="mb-[1rem]"
                  >
                    <a href={opcion.link}>
                      <h3
                        className={`text-${textColor} flex cursor-pointer my-[1rem]`}
                      >
                        <span className="material-symbols-outlined mr-[1rem]">
                          {opcion.icon}
                        </span>
                        {opcion.name}
                      </h3>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

SideBar.propTypes = {
  logo: PropTypes.string,
  enterprise: PropTypes.string,
  title: PropTypes.string,
  options: PropTypes.object,
  name: PropTypes.string,
  rol: PropTypes.string,
};

export default SideBar;
