import { Link} from "react-router-dom";

export function Main() {
    const symbols = ["💍", "🌹", "🌈", "🎊", "🎉", "🪄", "🖤", "💘", "💖", "💚"];
  
    return (
      
      <div
        className="screen-full relative h-screen w-screen overflow-hidden bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: `url('https://images.squarespace-cdn.com/content/v1/54035f3ae4b0e522f5dca08e/bf860377-80b1-4176-89b9-6a12dfa0b34c/Carla%26Dan-Bragg-Creek-Wedding-0721_websize.jpg')`,
          position: 'fixed',
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',
        }}
      >
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 30 }).map((_, index) => (
            <div
              key={index}
              className="absolute text-center animate-fall"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random()* 5}s`,
                animationDuration: `${5 + Math.random() * 5}s`,
                fontSize: `${Math.random()* 24 + 24}`,
              }}
            >
              {symbols[Math.floor(Math.random() * symbols.length)]}
            </div>
          ))}
  
          {[...Array(20)].map((_, index) => (
            <div
              key={index}
              className="absolute w-2 h-2 bg-yellow-300 rounded-full opacity-80 animate-fall"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 5}s`,
              }}
            ></div>
          ))}
        </div>
  
        <div className="absolute top-4 left-4 flex items-center space-x-4">
          <h1 className="text-3xl font-bold text-white underline decoration-2 font-bold ">Matrimony💘</h1>
        </div>
        <div className="absolute top-4 right-4 flex items-center space-x-4">
          <Link to='/signup'>
          <button className="text-black bg-green-400 px-8 py-2 rounded-full hover:bg-red-200">
            Sign up
          </button>
          </Link>
        </div>
  
        <div className="flex flex-col h-full items-center justify-center space-y-6 ml-10">
          <div className="text-center text-4xl font-bold text-red-600 px-3 py-10 max-w-lg rounded-lg shadow-lg">
            "A journey of a thousand miles begins with a single step, and a marriage begins with a promise of forever."
          </div>
        </div>
      </div>
    );
  }
  