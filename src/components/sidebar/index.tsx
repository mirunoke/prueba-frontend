"use client";

import Link from "next/link";
import Image from "next/image";
import SidebarItem from "@/components/sidebar/sidebar-item";
import ClickOutside from "@/components/ClickOutside";
import useLocalStorage from "@/hooks/useLocalStorage";
import { FaCar, FaWrench, FaArrowLeft } from "react-icons/fa6";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const menuGroups = [
  {
    name: "Menú de navegación",
    menuItems: [
      {
        icon: <FaCar  className="text-lg flex-shrink-0" />,
        label: "Vehiculos",
        route: "#",
        children: [
          { label: "Registrar vehiculo", route: "/vehicles/add-vehicle" },
          { label: "Lista de vehiculos", route: "/vehicles/list-vehicles" },
        ],
      },
      {
        icon: <FaWrench className="text-lg flex-shrink-0" />,
        label: "Inspecciones",
        route: "#",
        children: [
          { label: "Lista de inspecciones", route: "/inspections/list-inspections" },
          { label: "Mazda", route: "/inspections/mazda/add-inspection" },
          { label: "Hyundai", route: "/inspections/hyundai/add-inspection" },
          { label: "Nissan", route: "/inspections/nissan/add-inspection" }       
        ],
      }
    ],
  },
];

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const [pageName, setPageName] = useLocalStorage("selectedMenu", "dashboard");

  return (
    <ClickOutside onClick={() => setSidebarOpen(false)}>
      <aside
        className={`absolute left-0 top-0 z-[9999] flex flex-col h-screen border-r border-stroke bg-white dark:border-stroke-dark dark:bg-gray-dark lg:static lg:translate-x-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >

        <div className="sticky top-0 z-10 flex items-center justify-center px-6 py-5.5 lg:py-6.5 xl:py-10 bg-white dark:bg-gray-dark">

            <Link href="/">
              <Image
                width={200}
                height={60}
                src={"/logos/logo_negro.png"}
                alt="Logo"
                priority
                className="dark:hidden w-auto h-auto max-w-[160px]"
              />
              <Image
                width={200}
                height={40}
                src={"/logos/logo_blanco.png"}
                alt="Logo"
                priority
                className="hidden dark:block w-auto h-auto max-w-[160px]"
              />
            </Link>

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="absolute right-6"
          >
            <FaArrowLeft
              className={`text-2xl transition-transform duration-300 lg:hidden ${!sidebarOpen ? "rotate-180" : ""}`}
            />
          </button>
        </div>


        <div className="flex flex-1 flex-col">

          <div className="flex-grow overflow-y-auto">

            <nav className="mt-1 px-4 lg:px-6">
              {menuGroups.map((group, groupIndex) => (
                <div key={groupIndex} className="mb-6">

                  <ul className="flex flex-col gap-2">
                    {group.menuItems.map((menuItem, menuIndex) => (
                      <SidebarItem
                        key={menuIndex}
                        item={menuItem}
                        pageName={pageName}
                        setPageName={setPageName}
                      />
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </div>

         
        </div>
      </aside>
    </ClickOutside>
  );
};

export default Sidebar;
