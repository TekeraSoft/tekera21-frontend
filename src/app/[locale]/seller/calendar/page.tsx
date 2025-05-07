"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

type EventType = "training" | "campaign" | "payment" | "special";
type EventItem = {
  id: string;
  title: string;
  type: EventType;
  date: string;
  dateRange?: string;
  color: string;
};

function SellerCalendarPage() {
  const [date, setDate] = useState<Date>(new Date());
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  // Sample events data
  const events: EventItem[] = [
    {
      id: "1",
      title: "Ödeme Günü",
      type: "payment",
      date: "08.05.2025",
      dateRange: "08.05.2025 - 08.05.2025",
      color: "bg-green-500",
    },
    {
      id: "2",
      title: "Yapay Zekayla Ürün Görselleri Düzenleme Yolları",
      type: "training",
      date: "08.05.2025",
      dateRange: "08.05.2025 - 08.05.2025",
      color: "bg-purple-500",
    },
    {
      id: "3",
      title: "Erken Ödeme Günü",
      type: "payment",
      date: "09.05.2025",
      dateRange: "09.05.2025 - 09.05.2025",
      color: "bg-green-500",
    },
    {
      id: "4",
      title: "Ödeme Günü",
      type: "payment",
      date: "12.05.2025",
      dateRange: "12.05.2025 - 12.05.2025",
      color: "bg-green-500",
    },
    {
      id: "5",
      title: "Erken Ödeme Günü",
      type: "payment",
      date: "13.05.2025",
      dateRange: "13.05.2025 - 13.05.2025",
      color: "bg-green-500",
    },
    {
      id: "6",
      title: "Spor Alışveriş Günleri",
      type: "campaign",
      date: "15.05.2025",
      dateRange: "15.05.2025 - 16.05.2025",
      color: "bg-red-500",
    },
    {
      id: "7",
      title: "Ödeme Günü",
      type: "payment",
      date: "15.05.2025",
      dateRange: "15.05.2025 - 15.05.2025",
      color: "bg-green-500",
    },
    {
      id: "8",
      title: "Erken Ödeme Günü",
      type: "payment",
      date: "16.05.2025",
      dateRange: "16.05.2025 - 16.05.2025",
      color: "bg-green-500",
    },
    {
      id: "9",
      title: "Atatürk'ü Anma, Gençlik ve Spor Bayramı",
      type: "special",
      date: "19.05.2025",
      dateRange: "19.05.2025 - 19.05.2025",
      color: "bg-blue-500",
    },
    {
      id: "10",
      title: "Elektronik Günleri",
      type: "campaign",
      date: "20.05.2025",
      dateRange: "20.05.2025 - 21.05.2025",
      color: "bg-red-500",
    },
    {
      id: "11",
      title: "Avrupa Ülkeleri-Mega May Deals",
      type: "campaign",
      date: "13.05.2025",
      dateRange: "13.05.2025 - 14.05.2025",
      color: "bg-red-500",
    },
    {
      id: "12",
      title: "Azerbaycan-Mega May",
      type: "campaign",
      date: "13.05.2025",
      dateRange: "13.05.2025 - 14.05.2025",
      color: "bg-red-500",
    },
    {
      id: "13",
      title: "Mega Mayıs",
      type: "campaign",
      date: "13.05.2025",
      dateRange: "13.05.2025 - 14.05.2025",
      color: "bg-red-500",
    },
  ];

  // Get upcoming events
  const upcomingEvents = events
    .filter((event) => {
      const eventDate = new Date(event.date);
      const today = new Date();
      return eventDate >= today;
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 6);

  // Filter events by day
  const getEventsByDay = (day: number) => {
    return events.filter((event) => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getDate() === day && eventDate.getMonth() === date.getMonth()
      );
    });
  };

  // Filter events by type
  const getFilteredEvents = () => {
    if (selectedFilter === "all") return events;
    return events.filter((event) => {
      switch (selectedFilter) {
        case "training":
          return event.type === "training";
        case "campaign":
          return event.type === "campaign";
        case "payment":
          return event.type === "payment";
        case "special":
          return event.type === "special";
        default:
          return true;
      }
    });
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 my-5">
      {/* Main Calendar */}
      <div className="flex-1 border rounded-lg bg-white shadow-sm">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Mayıs 2025</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" className="h-8 w-8">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Tabs
            defaultValue="all"
            className="w-full"
            onValueChange={setSelectedFilter}
          >
            <TabsList className="grid grid-cols-4 h-9">
              <TabsTrigger value="training" className="text-xs">
                <span className="flex items-center gap-1">
                  <span className="h-3 w-3 rounded-sm bg-purple-500"></span>
                  Eğitimler
                </span>
              </TabsTrigger>
              <TabsTrigger value="campaign" className="text-xs">
                <span className="flex items-center gap-1">
                  <span className="h-3 w-3 rounded-sm bg-red-500"></span>
                  Kampanyalar
                </span>
              </TabsTrigger>
              <TabsTrigger value="payment" className="text-xs">
                <span className="flex items-center gap-1">
                  <span className="h-3 w-3 rounded-sm bg-green-500"></span>
                  Ödemeler
                </span>
              </TabsTrigger>
              <TabsTrigger value="special" className="text-xs">
                <span className="flex items-center gap-1">
                  <span className="h-3 w-3 rounded-sm bg-blue-500"></span>
                  Özel Günler
                </span>
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="mt-4">
            <Button variant="outline" className="text-xs">
              <CalendarIcon className="h-3 w-3 mr-1" />
              Bugün
            </Button>
          </div>
        </div>

        <div className="overflow-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-center text-sm">
                <th className="p-2 border w-1/7">Pzt</th>
                <th className="p-2 border w-1/7">Sal</th>
                <th className="p-2 border w-1/7">Çar</th>
                <th className="p-2 border w-1/7">Per</th>
                <th className="p-2 border w-1/7">Cum</th>
                <th className="p-2 border w-1/7">Cmt</th>
                <th className="p-2 border w-1/7">Paz</th>
              </tr>
            </thead>
            <tbody>
              {/* Week 1 */}
              <tr className="h-32">
                <td className="border p-1 align-top">
                  <div className="text-gray-400 text-sm">28</div>
                </td>
                <td className="border p-1 align-top">
                  <div className="text-gray-400 text-sm">29</div>
                </td>
                <td className="border p-1 align-top">
                  <div className="text-gray-400 text-sm">30</div>
                </td>
                <td className="border p-1 align-top">
                  <div className="text-sm font-medium">1</div>
                  {getEventsByDay(1).map((event) => (
                    <div
                      key={event.id}
                      className={`text-xs p-1 my-0.5 rounded ${event.color} text-white`}
                    >
                      {event.title}
                    </div>
                  ))}
                </td>
                <td className="border p-1 align-top">
                  <div className="text-sm font-medium">2</div>
                  {getEventsByDay(2).map((event) => (
                    <div
                      key={event.id}
                      className={`text-xs p-1 my-0.5 rounded ${event.color} text-white`}
                    >
                      {event.title}
                    </div>
                  ))}
                </td>
                <td className="border p-1 align-top">
                  <div className="text-sm font-medium">3</div>
                  {getEventsByDay(3).map((event) => (
                    <div
                      key={event.id}
                      className={`text-xs p-1 my-0.5 rounded ${event.color} text-white`}
                    >
                      {event.title}
                    </div>
                  ))}
                </td>
                <td className="border p-1 align-top">
                  <div className="text-sm font-medium">4</div>
                  {getEventsByDay(4).map((event) => (
                    <div
                      key={event.id}
                      className={`text-xs p-1 my-0.5 rounded ${event.color} text-white`}
                    >
                      {event.title}
                    </div>
                  ))}
                </td>
              </tr>

              {/* Week 2 */}
              <tr className="h-32">
                <td className="border p-1 align-top">
                  <div className="text-sm font-medium">5</div>
                  <div className="text-xs p-1 my-0.5 rounded bg-green-500 text-white">
                    Ödeme Günü
                  </div>
                </td>
                <td className="border p-1 align-top">
                  <div className="text-sm font-medium">6</div>
                  <div className="text-xs p-1 my-0.5 rounded bg-green-500 text-white">
                    Ödeme Günü
                  </div>
                </td>
                <td className="border p-1 align-top bg-orange-50">
                  <div className="text-sm font-medium">7</div>
                  <div className="text-xs p-1 my-0.5 rounded bg-green-500 text-white">
                    Erken Ödeme Günü
                  </div>
                </td>
                <td className="border p-1 align-top">
                  <div className="text-sm font-medium">8</div>
                  <div className="text-xs p-1 my-0.5 rounded bg-green-500 text-white">
                    Ödeme Günü
                  </div>
                  <div className="text-xs p-1 my-0.5 rounded bg-blue-500 text-white">
                    Emek ve Dayanış...
                  </div>
                </td>
                <td className="border p-1 align-top">
                  <div className="text-sm font-medium">9</div>
                  {getEventsByDay(9).map((event) => (
                    <div
                      key={event.id}
                      className={`text-xs p-1 my-0.5 rounded ${event.color} text-white`}
                    >
                      {event.title}
                    </div>
                  ))}
                </td>
                <td className="border p-1 align-top">
                  <div className="text-sm font-medium">10</div>
                  {getEventsByDay(10).map((event) => (
                    <div
                      key={event.id}
                      className={`text-xs p-1 my-0.5 rounded ${event.color} text-white`}
                    >
                      {event.title}
                    </div>
                  ))}
                </td>
                <td className="border p-1 align-top">
                  <div className="text-sm font-medium">11</div>
                  {getEventsByDay(11).map((event) => (
                    <div
                      key={event.id}
                      className={`text-xs p-1 my-0.5 rounded ${event.color} text-white`}
                    >
                      {event.title}
                    </div>
                  ))}
                </td>
              </tr>

              {/* Week 3 */}
              <tr className="h-32">
                <td className="border p-1 align-top">
                  <div className="text-sm font-medium">12</div>
                  <div className="text-xs p-1 my-0.5 rounded bg-green-500 text-white">
                    Ödeme Günü
                  </div>
                </td>
                <td className="border p-1 align-top">
                  <div className="text-sm font-medium">13</div>
                  <div className="text-xs p-1 my-0.5 rounded bg-red-500 text-white">
                    Avrupa Ülkeleri-Mega May Deals
                  </div>
                  <div className="text-xs p-1 my-0.5 rounded bg-red-500 text-white">
                    Azerbaycan-Mega May
                  </div>
                  <div className="text-xs p-1 my-0.5 rounded bg-red-500 text-white">
                    Mega Mayıs
                  </div>
                </td>
                <td className="border p-1 align-top">
                  <div className="text-sm font-medium">14</div>
                  <div className="text-xs p-1 my-0.5 rounded bg-green-500 text-white">
                    Erken Ödeme Günü
                  </div>
                </td>
                <td className="border p-1 align-top">
                  <div className="text-sm font-medium">15</div>
                  <div className="text-xs p-1 my-0.5 rounded bg-green-500 text-white">
                    Ödeme Günü
                  </div>
                  <div className="text-xs p-1 my-0.5 text-center text-green-600">
                    +1 daha fazla
                  </div>
                </td>
                <td className="border p-1 align-top">
                  <div className="text-sm font-medium">16</div>
                  <div className="text-xs p-1 my-0.5 rounded bg-red-500 text-white">
                    Spor Alışveriş Günleri
                  </div>
                </td>
                <td className="border p-1 align-top">
                  <div className="text-sm font-medium">17</div>
                  {getEventsByDay(17).map((event) => (
                    <div
                      key={event.id}
                      className={`text-xs p-1 my-0.5 rounded ${event.color} text-white`}
                    >
                      {event.title}
                    </div>
                  ))}
                </td>
                <td className="border p-1 align-top">
                  <div className="text-sm font-medium">18</div>
                  {getEventsByDay(18).map((event) => (
                    <div
                      key={event.id}
                      className={`text-xs p-1 my-0.5 rounded ${event.color} text-white`}
                    >
                      {event.title}
                    </div>
                  ))}
                </td>
              </tr>

              {/* Week 4 */}
              <tr className="h-32">
                <td className="border p-1 align-top">
                  <div className="text-sm font-medium">19</div>
                  <div className="text-xs p-1 my-0.5 rounded bg-blue-500 text-white">
                    Atatürk'ü Anma, G...
                  </div>
                </td>
                <td className="border p-1 align-top">
                  <div className="text-sm font-medium">20</div>
                  <div className="text-xs p-1 my-0.5 rounded bg-red-500 text-white">
                    Elektronik Günleri
                  </div>
                </td>
                <td className="border p-1 align-top">
                  <div className="text-sm font-medium">21</div>
                  {getEventsByDay(21).map((event) => (
                    <div
                      key={event.id}
                      className={`text-xs p-1 my-0.5 rounded ${event.color} text-white`}
                    >
                      {event.title}
                    </div>
                  ))}
                </td>
                <td className="border p-1 align-top">
                  <div className="text-sm font-medium">22</div>
                  {getEventsByDay(22).map((event) => (
                    <div
                      key={event.id}
                      className={`text-xs p-1 my-0.5 rounded ${event.color} text-white`}
                    >
                      {event.title}
                    </div>
                  ))}
                </td>
                <td className="border p-1 align-top">
                  <div className="text-sm font-medium">23</div>
                  {getEventsByDay(23).map((event) => (
                    <div
                      key={event.id}
                      className={`text-xs p-1 my-0.5 rounded ${event.color} text-white`}
                    >
                      {event.title}
                    </div>
                  ))}
                </td>
                <td className="border p-1 align-top">
                  <div className="text-sm font-medium">24</div>
                  {getEventsByDay(24).map((event) => (
                    <div
                      key={event.id}
                      className={`text-xs p-1 my-0.5 rounded ${event.color} text-white`}
                    >
                      {event.title}
                    </div>
                  ))}
                </td>
                <td className="border p-1 align-top">
                  <div className="text-sm font-medium">25</div>
                  {getEventsByDay(25).map((event) => (
                    <div
                      key={event.id}
                      className={`text-xs p-1 my-0.5 rounded ${event.color} text-white`}
                    >
                      {event.title}
                    </div>
                  ))}
                </td>
              </tr>

              {/* Week 5 */}
              <tr className="h-32">
                <td className="border p-1 align-top">
                  <div className="text-sm font-medium">26</div>
                  <div className="text-xs p-1 my-0.5 rounded bg-green-500 text-white">
                    Trendyol'a Kazanmız Gereken Faturalar Ola...
                  </div>
                </td>
                <td className="border p-1 align-top">
                  <div className="text-sm font-medium">27</div>
                  <div className="text-xs p-1 my-0.5 rounded bg-red-500 text-white">
                    Körfez Ülkeleri - PayDay / Bayram Hazırlık - Gulf
                  </div>
                </td>
                <td className="border p-1 align-top">
                  <div className="text-sm font-medium">28</div>
                  {getEventsByDay(28).map((event) => (
                    <div
                      key={event.id}
                      className={`text-xs p-1 my-0.5 rounded ${event.color} text-white`}
                    >
                      {event.title}
                    </div>
                  ))}
                </td>
                <td className="border p-1 align-top">
                  <div className="text-sm font-medium">29</div>
                  <div className="text-xs p-1 my-0.5 rounded bg-green-500 text-white">
                    Ödeme Günü
                  </div>
                </td>
                <td className="border p-1 align-top">
                  <div className="text-sm font-medium">30</div>
                  <div className="text-xs p-1 my-0.5 rounded bg-green-500 text-white">
                    Erken Ödeme Günü
                  </div>
                </td>
                <td className="border p-1 align-top">
                  <div className="text-sm font-medium">31</div>
                  {getEventsByDay(31).map((event) => (
                    <div
                      key={event.id}
                      className={`text-xs p-1 my-0.5 rounded ${event.color} text-white`}
                    >
                      {event.title}
                    </div>
                  ))}
                </td>
                <td className="border p-1 align-top">
                  <div className="text-gray-400 text-sm">1</div>
                </td>
              </tr>

              {/* Week 6 */}
              <tr className="h-32">
                <td className="border p-1 align-top">
                  <div className="text-gray-400 text-sm">2</div>
                </td>
                <td className="border p-1 align-top">
                  <div className="text-gray-400 text-sm">3</div>
                </td>
                <td className="border p-1 align-top">
                  <div className="text-gray-400 text-sm">4</div>
                </td>
                <td className="border p-1 align-top">
                  <div className="text-gray-400 text-sm">5</div>
                </td>
                <td className="border p-1 align-top">
                  <div className="text-gray-400 text-sm">6</div>
                </td>
                <td className="border p-1 align-top">
                  <div className="text-gray-400 text-sm">7</div>
                </td>
                <td className="border p-1 align-top">
                  <div className="text-gray-400 text-sm">8</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Sidebar - Upcoming Events */}
      <div className="w-full lg:w-80 border rounded-lg bg-white shadow-sm">
        <div className="p-4 border-b">
          <h3 className="font-semibold">En Yakın Etkinlikler</h3>
        </div>

        <div className="divide-y">
          {upcomingEvents.map((event) => (
            <div key={event.id} className="p-4">
              <div className="flex items-start gap-3">
                <div className="flex flex-col items-center">
                  <div
                    className={`h-8 w-8 rounded-md flex items-center justify-center ${
                      event.type === "payment"
                        ? "bg-green-100"
                        : event.type === "campaign"
                        ? "bg-red-100"
                        : event.type === "training"
                        ? "bg-purple-100"
                        : "bg-blue-100"
                    }`}
                  >
                    <span className="text-lg font-bold">
                      {new Date(event.date).getDate()}
                    </span>
                  </div>
                  <span className="text-xs">
                    {
                      ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"][
                        new Date(event.date).getDay()
                      ]
                    }
                  </span>
                </div>

                <div className="flex-1">
                  <h4 className="font-medium text-sm">{event.title}</h4>
                  <p className="text-xs text-gray-500 mt-1">
                    {event.dateRange}
                  </p>
                  {event.type !== "special" && (
                    <Button
                      variant="link"
                      className="text-xs p-0 h-auto text-blue-500 mt-1"
                    >
                      Detayları Gör
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SellerCalendarPage;
