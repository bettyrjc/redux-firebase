import cloudinary from "cloudinary";
import { fileUpload } from "../../helpers/fileUpload";

cloudinary.config({
  cloud_name: "dianpvnyk",
  api_key: "251244435447982",
  api_secret: "pvnfjO9Bh7K2X28AYJ9gL3J90MM",
});

describe("Pruebas es el fileUpload", () => {
  test("Debe cargar un archivo y retornar url ", async (done) => {
    const resp = await fetch(
      "https://www.online-image-editor.com/styles/2019/images/power_girl.png"
    );
    const blob = await resp.blob();
    const file = new File([blob], "foto.png");

    const url = await fileUpload(file);
    expect(typeof url).toBe("string");

    const segments = url.split("/");
    const imageID = segments[segments.length - 1].replace(".png", "");

    cloudinary.v2.api.delete_resources(imageID, {}, () => {
      done();
    });
  });

  test("Debe de retornar un error ", async () => {
    const file = new File([], "foto.png");

    const url = await fileUpload(file);
    expect(url).toBe(null);
  });
});
