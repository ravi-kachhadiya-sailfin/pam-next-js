import React, { useState } from 'react';
import { useRouter } from 'next/router'
import logo from '../assets/images/logos/logo1.svg';
// import { useLocation, useHistory } from 'react-router-dom';
export const MetaContext = React.createContext();

const MetaContextProvider = (props) => {
  const router = useRouter()
  // const location = useLocation()
  // const history = useHistory()

  console.log("router", router, global);
  // console.log("location", location);
  // console.log("history", history);

  const [meta, setMeta] = useState({
    title: "Pause A Moment",
    description: "The COVID-19 pandemic has taken a toll. Pause a moment to focus on your well-being.",
    image: logo,
    // url: window.location.href,
    keywords: "mental health, mood, burnout, anxiety, stress, PTSD, Depression, trauma, cbt, cognitive behavioral therapy, COVID, healthcare worker, meditation, visualization, relaxation, problem solving, breathing, behavioral activation, behavior activation, positive psychology, activity scheduling, cognitive bias, loving kindness, treatment resistant depression, compassion, self-compassion, rumination, hindsight bias, second guess, reappraisal, gratitude",
  });

  return <MetaContext.Provider value={{ meta: meta, setMeta: setMeta }}>
    {props.children}
  </MetaContext.Provider>
}

export default MetaContextProvider;