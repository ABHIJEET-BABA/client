import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { easing } from 'maath'
import { useSnapshot } from 'valtio'

import state from '../store'

const CameraRig = ({ children }) => {
  const group = useRef();
  const snap = useSnapshot(state);

  useFrame((state,delta) => {

    const isBreakpoints = window.innerWidth<=1260;
    const isMobile = window.innerWidth<=600;

    //set the inital position
    let targetPosition = [-0.4,0,2];
    if(snap.intro){
     
      if((isBreakpoints)) targetPosition=[0,0,2];
      if((isMobile)) targetPosition=[0,0.2,2.5];
      
    }else{
      if(isMobile) targetPosition=[0,0,2.5]
      else targetPosition = [0,0,2];
    }

    //rotation model
    easing.damp3(state.camera.position,targetPosition,0.25,delta)


    //how to rotation
    easing.dampE(
      group.current.rotation,
      [state.pointer.y / -2, -state.pointer.x / 30, 0],
      0.25,delta

    )


  })




  return (
    <group ref={group}>
      {children}
    </group>
  )
}

export default CameraRig