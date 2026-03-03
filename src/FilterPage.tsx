import { useLoaderData, useSearchParams } from "react-router-dom";
import {
  MapPin,
  Building2,
  Map,
  RotateCcw,
  ChevronRight,
  Globe,
} from "lucide-react";
import { RegionsData, Province, Regency, District } from "./types";

export async function loader(): Promise<RegionsData> {
  const response = await fetch("/data/indonesia_regions.json");
  if (!response.ok) throw new Error("Failed to fetch regions data");
  return response.json();
}

export default function FilterPage() {
  const data = useLoaderData() as RegionsData;
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedProvinceId = searchParams.get("province");
  const selectedRegencyId = searchParams.get("regency");
  const selectedDistrictId = searchParams.get("district");

  const provinces: Province[] = data.provinces || [];
  const regencies: Regency[] =
    data.regencies?.filter(
      (r) => r.province_id === Number(selectedProvinceId),
    ) || [];
  const districts: District[] =
    data.districts?.filter((d) => d.regency_id === Number(selectedRegencyId)) ||
    [];

  const selectedProvince = provinces.find(
    (p) => p.id === Number(selectedProvinceId),
  );
  const selectedRegency = data.regencies?.find(
    (r) => r.id === Number(selectedRegencyId),
  );
  const selectedDistrict = data.districts?.find(
    (d) => d.id === Number(selectedDistrictId),
  );

  const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value) {
      setSearchParams({ province: value });
    } else {
      setSearchParams({});
    }
  };

  const handleRegencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value) {
      setSearchParams({ province: selectedProvinceId || "", regency: value });
    } else {
      setSearchParams({ province: selectedProvinceId || "" });
    }
  };

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value) {
      setSearchParams({
        province: selectedProvinceId || "",
        regency: selectedRegencyId || "",
        district: value,
      });
    } else {
      setSearchParams({
        province: selectedProvinceId || "",
        regency: selectedRegencyId || "",
      });
    }
  };

  const handleReset = () => {
    setSearchParams({});
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Sidebar */}
      <aside className="w-80 border-r border-slate-200 bg-white p-6 shadow-sm flex flex-col">
        <div className="flex items-center gap-3 mb-10">
          <div className="p-2 bg-blue-600 rounded-lg text-white">
            <Globe size={20} />
          </div>
          <h1 className="font-bold text-xl tracking-tight">
            Frontend Assessment
          </h1>
        </div>

        <div className="flex-1 space-y-8">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-6">
              Filter Wilayah
            </span>

            <div className="space-y-6">
              {/* Province Select */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-1">
                  Provinsi
                </label>
                <div className="relative group">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors">
                    <Map size={16} />
                  </div>
                  <select
                    name="province"
                    value={selectedProvinceId || ""}
                    onChange={handleProvinceChange}
                    className="w-full pl-10 pr-10 py-3 bg-white border border-slate-200 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-sm shadow-sm"
                  >
                    <option value="">Pilih Provinsi</option>
                    {provinces.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-focus-within:rotate-180 transition-transform duration-300">
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                      <path
                        d="M1 1L5 5L9 1"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Regency Select */}
              <div
                className={`space-y-2 transition-opacity duration-300 ${!selectedProvinceId ? "opacity-40 pointer-events-none" : "opacity-100"}`}
              >
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-1">
                  Kota/Kabupaten
                </label>
                <div className="relative group">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors">
                    <Building2 size={16} />
                  </div>
                  <select
                    name="regency"
                    value={selectedRegencyId || ""}
                    onChange={handleRegencyChange}
                    disabled={!selectedProvinceId}
                    className="w-full pl-10 pr-10 py-3 bg-white border border-slate-200 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-sm shadow-sm"
                  >
                    <option value="">Pilih Kota/Kabupaten</option>
                    {regencies.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-focus-within:rotate-180 transition-transform duration-300">
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                      <path
                        d="M1 1L5 5L9 1"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* District Select */}
              <div
                className={`space-y-2 transition-opacity duration-300 ${!selectedRegencyId ? "opacity-40 pointer-events-none" : "opacity-100"}`}
              >
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-1">
                  Kecamatan
                </label>
                <div className="relative group">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors">
                    <MapPin size={16} />
                  </div>
                  <select
                    name="district"
                    value={selectedDistrictId || ""}
                    onChange={handleDistrictChange}
                    disabled={!selectedRegencyId}
                    className="w-full pl-10 pr-10 py-3 bg-white border border-slate-200 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-sm shadow-sm"
                  >
                    <option value="">Pilih Kecamatan</option>
                    {districts.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-focus-within:rotate-180 transition-transform duration-300">
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                      <path
                        d="M1 1L5 5L9 1"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={handleReset}
          className="mt-auto flex items-center justify-center gap-2 w-full py-4 bg-white border-2 border-blue-600 text-blue-600 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-blue-50 active:scale-95 transition-all shadow-md active:shadow-sm"
        >
          <RotateCcw size={14} />
          Reset
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Header/Breadcrumb */}
        <header className="h-16 border-b border-slate-200 bg-white px-10 flex items-center">
          <nav className="breadcrumb text-xs font-medium text-slate-400 flex items-center gap-2">
            <span>Indonesia</span>
            {selectedProvince && (
              <>
                <ChevronRight size={12} className="text-slate-300" />
                <span className="text-blue-500">{selectedProvince.name}</span>
              </>
            )}
            {selectedRegency && (
              <>
                <ChevronRight size={12} className="text-slate-300" />
                <span className="text-blue-500">{selectedRegency.name}</span>
              </>
            )}
            {selectedDistrict && (
              <>
                <ChevronRight size={12} className="text-slate-300" />
                <span className="text-blue-500">{selectedDistrict.name}</span>
              </>
            )}
          </nav>
        </header>

        {/* Content Display */}
        <div className="flex-1 p-20 flex flex-col items-center justify-center space-y-12">
          {selectedProvince ? (
            <div className="text-center ">
              <span className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.3em] block mb-4 animate-in fade-in slide-in-from-bottom-2">
                Provinsi
              </span>
              <h2 className="text-7xl font-black text-slate-800 tracking-tight ">
                {selectedProvince.name}
              </h2>

              {selectedRegency && (
                <>
                  <div className="my-10 text-slate-200 flex justify-center">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="animate-bounce"
                    >
                      <path d="M12 5v14M19 12l-7 7-7-7" />
                    </svg>
                  </div>
                  <div className="text-center ">
                    <span className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.3em] block mb-4 animate-in fade-in slide-in-from-bottom-2">
                      Kota / Kabupaten
                    </span>
                    <h2 className="text-7xl font-black text-slate-800 tracking-tight ">
                      {selectedRegency.name}
                    </h2>

                    {selectedDistrict && (
                      <>
                        <div className="my-10 text-slate-200 flex justify-center">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="animate-bounce"
                          >
                            <path d="M12 5v14M19 12l-7 7-7-7" />
                          </svg>
                        </div>
                        <div className="text-center ">
                          <span className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.3em] block mb-4 animate-in fade-in slide-in-from-bottom-2">
                            Kecamatan
                          </span>
                          <h2 className="text-7xl font-black text-slate-800 tracking-tight ">
                            {selectedDistrict.name}
                          </h2>
                        </div>
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="text-center space-y-6">
              <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center text-blue-500 mx-auto animate-pulse">
                <Globe size={48} />
              </div>
              <div className="space-y-2">
                <h2 className="text-3xl font-bold text-slate-800">
                  Selamat Datang
                </h2>
                <p className="text-slate-400 max-w-sm mx-auto">
                  Silakan pilih wilayah di sidebar untuk mulai memfilter data
                  wilayah Indonesia.
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
