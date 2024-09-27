import Container from "./Container";
import Image from "./Image";
import Flex from "./Flex";

const Offer = () => {
  return (
    <section className="mt-10 lg:mt-10 ">
      <Container>
        <Flex className=" flex-wrap lg:flex-nowrap gap-10">
          <div className="w-1/2">
            <Image src="images/Ad_1.png" alt="add_1" />
          </div>
          <div className=" w-1/2 flex flex-col gap-10">
            <Image
              src="images/Ad_2.png"
              alt="add_2"
              className="w-full h-auto"
            />
            <Image
              src="images/Ad_3.png"
              alt="add_3"
              className="w-full h-auto"
            />
          </div>
        </Flex>
      </Container>
    </section>
  );
};

export default Offer;
