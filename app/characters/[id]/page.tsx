export default async function CharacterDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  let character = null;
  let episodes = [];
  let errorMessage = "";

  try {
    const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);

    if (!res.ok) {
      errorMessage = "Character not found or API error.";
    } else {
      character = await res.json();

      episodes = await Promise.all(
        character.episode.map((ep: string) =>
          fetch(ep).then(r => r.json()).catch(() => null)
        )
      );
    }
  } catch (err) {
    errorMessage = "Failed to fetch data. Please try again later.";
  }

  return (
    <div className="p-5 min-h-screen bg-[#0f0f0f] text-white">

      {}
      <div className="mb-4">
        <a
          href="/characters"
          className="inline-block px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition"
        >
          ⬅ Kembali
        </a>
      </div>

      {}
      {errorMessage && (
        <div className="text-center text-red-400 text-lg font-semibold mt-10">
          {errorMessage}
        </div>
      )}

      {}
      {!errorMessage && !character && (
        <div className="text-center text-gray-300 text-lg font-semibold mt-10">
          No character data available.
        </div>
      )}

      {}
      {character && (
        <div className="flex justify-center">
          <div className="w-full max-w-3xl">

            {/* CARD UTAMA */}
            <div className="bg-[#1b1b1b] shadow-xl rounded-xl p-6 flex gap-6">
              <img
                src={character.image}
                alt={character.name}
                className="rounded-lg w-48 h-48 object-cover"
              />

              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-4">{character.name}</h1>

                <div className="space-y-1 text-sm text-gray-300">
                  <p><strong className="text-white">Status:</strong> {character.status}</p>
                  <p><strong className="text-white">Species:</strong> {character.species}</p>
                  <p><strong className="text-white">Origin:</strong> {character.origin?.name}</p>
                  <p><strong className="text-white">Location:</strong> {character.location?.name}</p>
                  <p><strong>Gender:</strong> {character.gender}</p>

                </div>
              </div>
            </div>

            {}
            <div className="mt-6 bg-[#1b1b1b] p-4 rounded-xl shadow-lg">
              <h2 className="text-xl font-bold mb-3">Episodes:</h2>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-300">
                {episodes.filter(Boolean).slice(0, 5).map((ep) => (
                  <li key={ep.id}>
                    {ep.name} ({ep.episode}) - {ep.air_date}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
