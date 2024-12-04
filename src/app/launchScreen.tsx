import Image from 'next/image'

export default function LaunchScreen() {
  return (
    <main
      className={
        'w-full h-screen bg-secondary flex items-center justify-center'
      }
    >
      <Image
        src={'/hantan_logo.png'}
        alt="Logo"
        width={250}
        height={100}
        className={
          'animate-fade-up animate-duration-[2000ms] animate-delay-500 animate-ease-linear'
        }
      />
    </main>
  )
}
