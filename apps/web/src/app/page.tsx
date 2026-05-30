export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white p-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Sistema de Treinamentos Profissionais
        </h1>
        <p className="text-gray-600 text-lg">
          Plataforma de cursos e certificações corporativas
        </p>
      </div>

      <a
        href="/login"
        className="group rounded-xl border border-gray-200 bg-white px-8 py-6 shadow-sm transition-all hover:border-blue-300 hover:shadow-md hover:bg-blue-50"
      >
        <h2 className="mb-2 text-2xl font-semibold text-gray-800">
          Login{" "}
          <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none text-blue-600">
            -&gt;
          </span>
        </h2>
        <p className="text-gray-500">
          Acesse sua conta para continuar
        </p>
      </a>
    </main>
  );
}
