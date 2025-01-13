import { Link} from "react-router-dom";

export function Main() {
    const symbols = ["💍", "🌹", "🌈", "🎊", "🎉", "🪄", "🖤", "💘", "💖", "💚"];
  
    return (
      
      <div
        className="screen-full relative h-screen w-screen overflow-hidden bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/1488318/pexels-photo-1488318.jpeg')`,
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
          {[...Array(15)].map((_, index) => (
            <div
              key={index}
              className="absolute text-red-400 opacity-90 animate-heart"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                fontSize: `${Math.random() * 30 + 20}px`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 5}s`,
              }}
            >
              💙💞
            </div>
          ))}
        </div>
  
        <div className="absolute top-4 left-4 flex items-center space-x-4">
          <h1 className="text-3xl font-bold text-blue-600 font-bold underline decoration-10">💘Matrimony</h1>
          <Link to='/login'>
          <button className="text-black bg-gray-100 px-8 py-2 rounded-full hover:bg-gray-600">
            Sign In
          </button>
          </Link>
        </div>
        <div className="absolute top-4 right-4 flex items-center space-x-4">
          <Link to='/signup'>
          <button className="text-black bg-green-400 px-8 py-2 rounded-full hover:bg-red-200">
            Sign up
          </button>
          </Link>
        </div>
  
        <div className="flex flex-col h-full items-center justify-center space-y-6 ml-10">
          <div className="text-center text-4xl font-bold text-white px-3 py-10 max-w-lg rounded-lg shadow-lg border-t-4 border-b-4 border-gray-300">
            "A journey of a thousand miles begins with a single step, and a marriage begins with a promise of forever."
          </div>
        </div>
      </div>
    );
  }
  