import { faCheck, faTimes, faVolumeUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@material-ui/core";
import { useState } from "react";

const misol = [
  { english: "Hello, World", uzbek: ["Salom", "Dunyo"], words: ["Salom", "Hayr", "Qalesan", "Dunyo"], img: "penguin.gif" },
  { english: "I study in Moscow", uzbek: ["Men", "Moskvada", "O'qiyman"], words: ["Moskvaga", "Men", "Moskvada", "O'qiyman", "Boraman"], img: "king.gif" },
  { english: "I am bored", uzbek: ["Men", "Zerikdim"], words: ["Men", "Charchadim", "Zerikdim", "Hursandman"], img: "person.gif" }
]

export default function Home() {

  const [misolNumber, setmisolNumber] = useState(0);

  const [choose, setchoose] = useState([]);

  const [javob, setjavob] = useState("");

  const [nextButton, setnextButton] = useState(false);

  const [isEnd, setisEnd] = useState(false)

  const chooseWord = (txt, i) => {
    let NewChoose = [...choose];
    NewChoose.push(txt);
    misol[misolNumber].words.splice(i, 1);
    setchoose(NewChoose);
  }

  const deleteChooseWord = (v, i) => {
    let NewChoose = [...choose];
    NewChoose.splice(i, 1);
    misol[misolNumber].words.push(v);
    setchoose(NewChoose);
  }

  const answer = () => {
    if (JSON.stringify(choose) == JSON.stringify(misol[misolNumber].uzbek)) {
      setjavob(<FontAwesomeIcon icon={faCheck} className="text-success fs-3" />);
      setnextButton(true);
    } else {
      setjavob(<FontAwesomeIcon icon={faTimes} className="text-danger fs-3" />)
    };

    if (misolNumber == 2) {
      setjavob("Misollar tugadi");
      setisEnd(true)
    }
  }

  const next = () => {
    if (misolNumber <= 2) {
      setmisolNumber(misolNumber + 1);
      setchoose([]);
      setjavob("");
      setnextButton(false);
    }
  }

  const talk = () => {
    var msg = new SpeechSynthesisUtterance(misol[misolNumber].english);
    window.speechSynthesis.speak(msg);
  }

  return (
    <div className="container py-3">
      <div className="row">
        <div className="col-8 offset-2">
          <h3 className="text-center">Berilgan so'zning o'zbekcha tarjimasini toping</h3>
          <div className="d-flex align-items-center">
            <img src={misol[misolNumber].img} alt="?" style={{ width: "40%" }} />
            <div className="d-flex align-items-center w-50 border px-3 py-2" style={{ borderRadius: "15px" }}>
              <Button className="fs-4 me-2 text-primary" onClick={talk}><FontAwesomeIcon icon={faVolumeUp} /></Button>
              <p className="m-0 fs-4">{misol[misolNumber].english}</p>
            </div>
          </div>
        </div>
        <div className="col-12 border-top border-bottom py-2" style={{ minHeight: "7rem" }}>
          {
            choose.map((v, i) => {
              return <Button variant="contained" color="secondary" className="me-3" onClick={() => deleteChooseWord(v, i)} key={i}>{v}</Button>
            })
          }
        </div>
        <div className="col-12 py-3">
          {
            misol[misolNumber].words.sort((a, b) => 0.5 - Math.random()).map((v, i) => {
              return <Button variant="contained" color="primary" className="me-3" onClick={() => chooseWord(v, i)} key={i}>{v}</Button>
            })
          }
        </div>
        <div className="col-12 d-flex align-items-center justify-content-between p-3 answer">
          <p className="m-0">{javob}</p>
          <div>
            {nextButton && isEnd == false && <Button variant="contained" color="primary" onClick={next} className="next">Keyingisi</Button> || isEnd == false && <Button variant="contained" color="secondary" onClick={answer}>Tekshirish</Button>}
          </div>
        </div>
      </div>
    </div>
  )
}


