import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../../context/UseContext/UseContext";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useSprings, animated } from '@react-spring/web';
import { base_url } from "../../../layout/Title";


const TaskReport = () => {

      const { user } = useContext(AuthContext)

      const {
            data: contacts = [],
            refetch,
            isLoading,
      } = useQuery({
            queryKey: ["contacts"],
            queryFn: async () => {
                  const res = await fetch(`${base_url}/contact/get-contacts`, {
                        headers: {
                              "content-type": "application/json",
                              author: "bright_future_soft",
                        },
                        method: "GET",
                  })
                  const data = await res.json()
                  return data.data
            },
      })

      const [greeting, setGreeting] = useState("");

      useEffect(() => {
            const hour = new Date().getHours();
            let greet;
            if (hour >= 5 && hour < 12) {
                  greet = "Good Morning";
            } else if (hour >= 12 && hour < 17) {
                  greet = "Good Afternoon";
            } else if (hour >= 17 && hour < 21) {
                  greet = "Good Evening";
            } else {
                  greet = "Hello";
            }
            setGreeting(greet);
      }, []);


      return (

            <section class="py-10 ">
                  <div class="px-4  ">



                        <div class="text-center flex justify-center items-center">

                              <div>
                                    <SplitText
                                          text={greeting + ", "}
                                          className="text-8xl font-bold text-white text-center"
                                          delay={150}
                                          animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
                                          animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                                          easing="easeOutCubic"
                                          threshold={0.2}
                                          rootMargin="-50px"

                                    />

                                    <GlitchText
                                          speed={1}
                                          enableShadows={true}
                                          enableOnHover={true}
                                          className='custom-class'
                                    >
                                          {user?.name}

                                    </GlitchText>
                                    <h4 class="text-4xl font-medium text-gray-100 font-sans">Today's All Report Is Here</h4>
                              </div>

                        </div>

                        <div class="grid grid-cols-1 gap-6 px-6 mt-8 sm:px-0 lg:mt-16 sm:grid-cols-2 lg:grid-cols-4">
                              <SpotlightCard className="custom-spotlight-card" spotlightColor="#0A65B4">
                                    <div class="">
                                          <div class="flex items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="0.75" stroke-linecap="round" stroke-linejoin="round" class="flex-shrink-0 w-12 h-12 text-[#5850EC]"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="m9 11 3 3L22 4" /></svg>
                                                <div class="ml-4">
                                                      <h4 class="text-4xl font-bold ">6</h4>
                                                      <p class="mt-1.5 text-2xl font-bold  leading-tight ">New Task</p>
                                                </div>
                                          </div>
                                    </div>
                              </SpotlightCard>

                              <SpotlightCard className="custom-spotlight-card" spotlightColor="#0A65B4">
                                    <div class="flex items-start">
                                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="0.75" stroke-linecap="round" stroke-linejoin="round" class="flex-shrink-0 w-12 h-12 text-[#5850EC]"><path d="M2 3h20" /><path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3" /><path d="m7 21 5-5 5 5" /></svg>
                                          <div class="ml-4">
                                                <h4 class="text-4xl font-bold ">37</h4>
                                                <p class="mt-1.5 text-2xl font-bold  leading-tight ">New Meeting</p>
                                          </div>
                                    </div>
                              </SpotlightCard>

                              <SpotlightCard className="custom-spotlight-card" spotlightColor="#0A65B4">
                                    <div class="flex items-start">
                                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="0.75" stroke-linecap="round" stroke-linejoin="round" class="flex-shrink-0 w-12 h-12 text-[#5850EC]"><path d="m3 11 18-5v12L3 14v-3z" /><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" /></svg>
                                          <div class="ml-4">
                                                <h4 class="text-4xl font-bold ">3,274</h4>
                                                <p class="mt-1.5 text-2xl font-bold  leading-tight ">Notice</p>
                                          </div>
                                    </div>
                              </SpotlightCard>
                              <SpotlightCard className="custom-spotlight-card" spotlightColor="#0A65B4">
                                    <div class="flex items-start">
                                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="0.75" stroke-linecap="round" stroke-linejoin="round" class="flex-shrink-0 w-12 h-12 text-[#5850EC]"><path d="m8 2 1.88 1.88" /><path d="M14.12 3.88 16 2" /><path d="M9 7.13v-1a3.003 3.003 0 1 1 6 0v1" /><path d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6" /><path d="M12 20v-9" /><path d="M6.53 9C4.6 8.8 3 7.1 3 5" /><path d="M6 13H2" /><path d="M3 21c0-2.1 1.7-3.9 3.8-4" /><path d="M20.97 5c0 2.1-1.6 3.8-3.5 4" /><path d="M22 13h-4" /><path d="M17.2 17c2.1.1 3.8 1.9 3.8 4" /></svg>
                                          <div class="ml-4">
                                                <h4 class="text-4xl font-bold ">98</h4>
                                                <p class="mt-1.5 text-2xl font-bold  leading-tight "> Employee Issues</p>
                                          </div>
                                    </div>
                              </SpotlightCard>
                              <SpotlightCard className="custom-spotlight-card" spotlightColor="#0A65B4">
                                    <div class="flex items-start">
                                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="0.75" stroke-linecap="round" stroke-linejoin="round" class="flex-shrink-0 w-12 h-12 text-[#5850EC]"><path d="m8 2 1.88 1.88" /><path d="M14.12 3.88 16 2" /><path d="M9 7.13v-1a3.003 3.003 0 1 1 6 0v1" /><path d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6" /><path d="M12 20v-9" /><path d="M6.53 9C4.6 8.8 3 7.1 3 5" /><path d="M6 13H2" /><path d="M3 21c0-2.1 1.7-3.9 3.8-4" /><path d="M20.97 5c0 2.1-1.6 3.8-3.5 4" /><path d="M22 13h-4" /><path d="M17.2 17c2.1.1 3.8 1.9 3.8 4" /></svg>
                                          <div class="ml-4">
                                                <h4 class="text-4xl font-bold ">98</h4>
                                                <p class="mt-1.5 text-2xl font-bold  leading-tight "> Issues</p>
                                          </div>
                                    </div>
                              </SpotlightCard>
                              <SpotlightCard className="custom-spotlight-card" spotlightColor="#0A65B4">
                                    <div class="flex items-start">
                                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="0.75" stroke-linecap="round" stroke-linejoin="round" class="flex-shrink-0 w-12 h-12 text-[#5850EC]"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /><path d="M14 2v4a2 2 0 0 0 2 2h4" /></svg>
                                          <div class="ml-4">
                                                <h4 class="text-4xl font-bold ">98</h4>
                                                <p class="mt-1.5 text-2xl font-bold  leading-tight ">Application  </p>
                                          </div>
                                    </div>
                              </SpotlightCard>
                              <SpotlightCard className="custom-spotlight-card" spotlightColor="#0A65B4">
                                    <div class="flex items-start">

                                          <svg class="flex-shrink-0 w-12 h-12 text-[#5850EC]" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="0.75" stroke-linecap="round" stroke-linejoin="round" ><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" /><path d="M18 14h-8" /><path d="M15 18h-5" /><path d="M10 6h8v4h-8V6Z" /></svg>
                                          <div class="ml-4">
                                                <h4 class="text-4xl font-bold ">98</h4>
                                                <p class="mt-1.5 text-2xl font-bold  leading-tight ">Contact Request</p>
                                          </div>
                                    </div>
                              </SpotlightCard>
                              <SpotlightCard className="custom-spotlight-card" spotlightColor="#0A65B4">
                                    <div class="flex items-start">
                                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="0.75" stroke-linecap="round" stroke-linejoin="round" class="flex-shrink-0 w-12 h-12 text-[#5850EC]"><path d="M9 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v5" /><circle cx="13" cy="12" r="2" /><path d="M18 19c-2.8 0-5-2.2-5-5v8" /><circle cx="20" cy="19" r="2" /></svg>
                                          <div class="ml-4">
                                                <h4 class="text-4xl font-bold ">98</h4>
                                                <p class="mt-1.5 text-2xl font-bold  leading-tight ">Projects</p>
                                          </div>
                                    </div>
                              </SpotlightCard>

                        </div>
                  </div>
            </section>

      );
};

export default TaskReport;




const SpotlightCard = ({ children, className = "", spotlightColor = "rgba(255, 255, 255, 0.25)" }) => {
      const divRef = useRef(null);

      const handleMouseMove = (e) => {
            const rect = divRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            divRef.current.style.setProperty("--mouse-x", `${x}px`);
            divRef.current.style.setProperty("--mouse-y", `${y}px`);
            divRef.current.style.setProperty("--spotlight-color", spotlightColor);
      };

      return (
            <div
                  ref={divRef}
                  onMouseMove={handleMouseMove}
                  className={`card-spotlight ${className}`}
            >
                  {children}
            </div>
      );
};




const GlitchText = ({
      children,
      speed = 1,
      enableShadows = true,
      enableOnHover = true,
      className = '',
}) => {
      const inlineStyles = {
            '--after-duration': `${speed * 3}s`,
            '--before-duration': `${speed * 2}s`,
            '--after-shadow': enableShadows ? '-5px 0 red' : 'none',
            '--before-shadow': enableShadows ? '5px 0 cyan' : 'none',
      };

      const hoverClass = enableOnHover ? 'enable-on-hover' : '';

      return (
            <div
                  className={`glitch ${hoverClass} ${className}`}
                  style={inlineStyles}
                  data-text={children}
            >
                  {children}
            </div>
      );
};





const SplitText = ({
      text = '',
      className = '',
      delay = 100,
      animationFrom = { opacity: 0, transform: 'translate3d(0,40px,0)' },
      animationTo = { opacity: 1, transform: 'translate3d(0,0,0)' },
      easing = 'easeOutCubic',
      threshold = 0.1,
      rootMargin = '-100px',
      textAlign = 'center',
      onLetterAnimationComplete,
}) => {
      const words = text.split(' ').map(word => word.split(''));

      const letters = words.flat();
      const [inView, setInView] = useState(false);
      const ref = useRef();
      const animatedCount = useRef(0);

      useEffect(() => {
            const observer = new IntersectionObserver(
                  ([entry]) => {
                        if (entry.isIntersecting) {
                              setInView(true);
                              observer.unobserve(ref.current);
                        }
                  },
                  { threshold, rootMargin }
            );

            observer.observe(ref.current);

            return () => observer.disconnect();
      }, [threshold, rootMargin]);

      const springs = useSprings(
            letters.length,
            letters.map((_, i) => ({
                  from: animationFrom,
                  to: inView
                        ? async (next) => {
                              await next(animationTo);
                              animatedCount.current += 1;
                              if (animatedCount.current === letters.length && onLetterAnimationComplete) {
                                    onLetterAnimationComplete();
                              }
                        }
                        : animationFrom,
                  delay: i * delay,
                  config: { easing },
            }))
      );

      return (
            <p
                  ref={ref}
                  className={`split-parent ${className}`}
                  style={{ textAlign, overflow: 'hidden', display: 'inline', whiteSpace: 'normal', wordWrap: 'break-word' }}
            >
                  {words.map((word, wordIndex) => (
                        <span key={wordIndex} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
                              {word.map((letter, letterIndex) => {
                                    const index = words
                                          .slice(0, wordIndex)
                                          .reduce((acc, w) => acc + w.length, 0) + letterIndex;

                                    return (
                                          <animated.span
                                                key={index}
                                                style={{
                                                      ...springs[index],
                                                      display: 'inline-block',
                                                      willChange: 'transform, opacity',
                                                }}
                                          >
                                                {letter}
                                          </animated.span>
                                    );
                              })}
                              <span style={{ display: 'inline-block', width: '0.3em' }}>&nbsp;</span>
                        </span>
                  ))}
            </p>
      );
};
