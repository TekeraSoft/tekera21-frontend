export default function BuyerNewsletterSection() {
  return (
    <div className="bg-purple-600">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16 lg:px-8">
        <div className="rounded-lg bg-purple-700 px-6 py-6 md:py-12 md:px-12 lg:py-16 lg:px-16 xl:flex xl:items-center">
          <div className="xl:w-0 xl:flex-1">
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Yeni ürünler ve indirimlerden haberdar olun
            </h2>
            <p className="mt-3 max-w-3xl text-sm text-purple-200">
              E-bültenimize kaydolun ve en yeni koleksiyonlar, özel teklifler ve
              indirimler hakkında ilk siz haberdar olun.
            </p>
          </div>
          <div className="mt-8 sm:w-full sm:max-w-md xl:mt-0 xl:ml-8">
            <form className="sm:flex">
              <label htmlFor="email-address" className="sr-only">
                E-posta adresiniz
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full rounded-md border-white px-5 py-3 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-purple-700"
                placeholder="E-posta adresiniz"
              />
              <button
                type="submit"
                className="mt-3 flex w-full items-center justify-center rounded-md border border-transparent bg-purple-900 px-5 py-3 text-base font-medium text-white shadow hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-purple-700 sm:mt-0 sm:ml-3 sm:w-auto sm:flex-shrink-0"
              >
                Abone Ol
              </button>
            </form>
            <p className="mt-3 text-sm text-purple-200">
              Gizliliğinize önem veriyoruz. Bilgilerinizi asla paylaşmayacağız.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
