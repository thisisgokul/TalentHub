import React from 'react'
import Nav from '../compoents/Nav'
import Hero from '../sections/Hero'
import Instruction from '../sections/Instruction'
import Features from '../sections/Features'
import Footer from '../sections/Footer'


const LandingPage = () => {
  return (
    <main>
        <Nav/>
        <section><Hero/></section>
        <section><Instruction/></section>
        <section><Features/></section>
        <section><Footer/></section>
    </main>
  )
}

export default LandingPage