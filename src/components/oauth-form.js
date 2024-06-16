import { loginGoogle, loginGithub, loginGitlab, loginSpotify } from "@/lib/actions";

function OAuthForm() {
  return (
    <form className="flex flex-col justify-center items-center space-y-4">
      <button formAction={loginGoogle} className="mt-10 flex items-center justify-center bg-red-500 text-white py-3 px-6 rounded-md w-full max-w-sm hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-400">
        <img src="/google.svg" alt="Google" className="w-6 h-6 mr-2" />
        Iniciar sesión con Google
      </button>

      <button formAction={loginGithub} className="flex items-center justify-center bg-black text-white py-3 px-6 rounded-md w-full max-w-sm hover:bg-gray-800 focus:outline-none focus:ring focus:ring-gray-400">
        <img src="/github.svg" alt="Github" className="w-6 h-6 mr-2" />
        Iniciar sesión con Github
      </button>
    </form>
  );
}

export default OAuthForm;
