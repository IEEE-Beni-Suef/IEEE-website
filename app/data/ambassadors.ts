import abdelrhmanHafezImg from "~/assets/images/Ambassdors/Abdelrhman Hafez 1.jpg";
import ahmedElbannaImg from "~/assets/images/Ambassdors/Ahmed M.Elbanaa 1.jpg";
import aliWasel1Img from "~/assets/images/Ambassdors/Ali Wasel 1.jpg";
import aliWasel2Img from "~/assets/images/Ambassdors/Ali Wasel 2.jpg";
import amrGamalImg from "~/assets/images/Ambassdors/Amr Gamal 1.jpg";
import amrHasanImg from "~/assets/images/Ambassdors/Amr Hasan 1.jpg";
import emanAhmedImg from "~/assets/images/Ambassdors/Eman Ahmed 1.jpg";
import khaledTahaImg from "~/assets/images/Ambassdors/Khaled Taha 1.jpg";
import mennaMahmoudImg from "~/assets/images/Ambassdors/Menna Mahmoud 1.jpg";
import mohamedDahi1Img from "~/assets/images/Ambassdors/Mohamed Dahi 1.jpg";
import mohamedDahi2Img from "~/assets/images/Ambassdors/Mohamed Dahi 2.jpg";
import mohamedSharafImg from "~/assets/images/Ambassdors/Mohamed Sharaf 1.jpg";
import rahmaElRamady2Img from "~/assets/images/Ambassdors/Rahma El-Ramady 2.jpg";
import rahmaMahmoud1Img from "~/assets/images/Ambassdors/Rahma Mahmoud 1.jpg";
import saharEhabImg from "~/assets/images/Ambassdors/Sahar Ehab 1.jpg";
import youssefKoriemImg from "~/assets/images/Ambassdors/Youssef Koriem 1.jpg";

export interface Ambassador {
  id: string;
  name: string;
  place: string;
  image: string;
  role?: string;
  description?: string;
}

export const ambassadors: Ambassador[] = [
  {
    id: "abdelrhman-hafez",
    name: "Abdulrhman Hafez",
    place: "IEEE Beni-Suef Student Branch - Region 8",
    image: abdelrhmanHafezImg,
  },
  {
    id: "ahmed-m-elbanna",
    name: "Ahmed M. El-Banna",
    place: "Beni-Suef, Egypt Section",
    image: ahmedElbannaImg,
  },
  {
    id: "ali-wasel-1",
    name: "Ali Wasel",
    place: "IEEE Beni-Suef Student Branch - Region 8",
    image: aliWasel1Img,
  },
  {
    id: "ali-wasel-2",
    name: "Ali Wasel",
    place: "IEEE Region 8 - Humanitarian Technology",
    image: aliWasel2Img,
  },
  {
    id: "amr-gamal",
    name: "Amr Gamal",
    place: "IEEE Beni-Suef Student Branch - Region 8",
    image: amrGamalImg,
  },
  {
    id: "amr-hasan",
    name: "Amr Hassan",
    place: "IEEE Beni-Suef Student Branch - Region 8",
    image: amrHasanImg,
  },
  {
    id: "eman-ahmed",
    name: "Eman Ahmed",
    place: "IEEE Beni-Suef Student Branch - Region 8",
    image: emanAhmedImg,
  },
  {
    id: "khaled-taha",
    name: "Khaled Taha",
    place: "IEEE Beni-Suef Student Branch - Region 8",
    image: khaledTahaImg,
  },
  {
    id: "menna-mahmoud",
    name: "Menna Mahmoud",
    place: "IEEE Beni-Suef Student Branch - Region 8",
    image: mennaMahmoudImg,
  },
  {
    id: "mohamed-dahi-1",
    name: "Mohamed Dahi",
    place: "International Ambassadors - Beni-Suef",
    image: mohamedDahi1Img,
  },
  {
    id: "mohamed-dahi-2",
    name: "Mohamed Dahi",
    place: "IEEE Region 8 - Humanitarian Technology",
    image: mohamedDahi2Img,
  },
  {
    id: "mohamed-sharaf",
    name: "Mohamed Sharaf",
    place: "Beni-Suef, Egypt Section",
    image: mohamedSharafImg,
  },
  {
    id: "rahma-el-ramady",
    name: "Rahma El-Ramady",
    place: "IEEE Region 8 - Humanitarian Technology",
    image: rahmaElRamady2Img,
  },
  {
    id: "rahma-mahmoud",
    name: "Rahma Mahmoud El-Ramady",
    place: "IEEE Egypt Section - TSYP 14",
    image: rahmaMahmoud1Img,
  },
  {
    id: "sahar-ehab",
    name: "Sahar Ehab",
    place: "Beni-Suef, Egypt Section",
    image: saharEhabImg,
  },
  {
    id: "youssef-koriem",
    name: "Youssef Koriem",
    place: "IEEE Beni-Suef Student Branch",
    image: youssefKoriemImg,
  },
];
