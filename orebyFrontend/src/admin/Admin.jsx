import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();
  const data = useSelector((state) => state.userInfo.value);
  useEffect(() => {
    if (!data) {
      navigate("admin/login");
    }
  }, []);
  return (
    <>
      <div className="mx-3 w-full">
        <h2>admin</h2>
        <p>this is admin panel</p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere
          accusamus ut ipsa libero doloribus ullam perferendis tenetur eaque
          incidunt sed? Est temporibus aspernatur debitis expedita asperiores
          tempore hic quisquam esse voluptates enim delectus dolorem optio,
          fugiat cupiditate consequuntur nemo placeat quam qui. Adipisci in,
          numquam enim explicabo vel non distinctio magnam eius facilis quaerat
          suscipit ab mollitia quos necessitatibus quis sunt porro quas facere
          nostrum animi cum ipsum exercitationem obcaecati! Sed quibusdam
          deleniti asperiores repellendus nostrum perferendis. Excepturi
          pariatur explicabo iure expedita ex blanditiis eius quae perferendis
          possimus praesentium sequi voluptate, provident quaerat ea sunt
          aliquid in, obcaecati, necessitatibus perspiciatis voluptatibus vitae
          recusandae? Dolorum sint itaque eveniet provident quam vel explicabo
          ipsum, omnis, autem earum voluptatem, error maiores enim? Vel,
          eligendi, animi reprehenderit molestiae nemo impedit accusamus enim
          illum velit voluptate sunt ullam optio autem natus incidunt culpa
          totam perspiciatis aperiam possimus officia. Molestias nostrum
          possimus laboriosam nam dignissimos dolorem vero, ut quos et ipsum
          iusto quis facere voluptate eveniet labore nisi dolore assumenda sequi
          ad accusamus amet neque? Sit debitis, id consequatur accusantium
          possimus unde nemo vero nulla! Corporis, facere laudantium? Temporibus
          tempore exercitationem sunt numquam tempora inventore voluptates
          consequuntur provident. Officiis vero iusto natus velit esse itaque
          laudantium nostrum, quaerat commodi saepe maxime reprehenderit aperiam
          a quae cumque magni quas temporibus. Aspernatur, labore rerum impedit
          eum recusandae beatae dolorum cumque enim quidem, distinctio, nostrum
          vitae omnis necessitatibus laudantium ipsum neque sunt nihil deleniti.
          Qui modi corrupti quae velit asperiores repellendus, blanditiis
          adipisci perspiciatis quidem, cupiditate unde eligendi dolorum
          consequatur sapiente error officia. Enim minus sit fuga nulla hic,
          debitis vero eius voluptate ullam aspernatur dolorem consequuntur
          accusamus provident labore illum, voluptas accusantium totam
          molestias? Itaque assumenda, ipsum at unde corporis voluptatibus sed
          velit sequi libero quae molestiae eaque a sit aperiam maiores
          reiciendis eius ad harum corrupti facilis.
        </p>
      </div>
    </>
  );
};

export default Admin;
