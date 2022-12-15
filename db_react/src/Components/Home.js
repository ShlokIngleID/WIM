import { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";

function Home() {
  let [data, setData] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3000").then((resp) => {
      console.log(resp.data);
      setData(resp.data);
    });
  }, []);
  return (
    <>
    <div class="card-header pb-0">
        <h5>Trains with higher axle box temperature</h5>
    </div>
    <table class="table align-items-center mb-0">
                  <thead>
                    <tr>
                    <th class="text-secondary opacity-7 align-middle">ID</th>
                      <th class="text-secondary opacity-7 align-middle">Train</th>
                      <th class="text-secondary opacity-7 align-middle">Unique ID</th>
                      <th class="text-secondary opacity-7 align-middle">Axle-Right</th>
                      <th class="text-secondary opacity-7 align-middle">Temp</th>
                      <th class="text-secondary opacity-7 align-middle">Axle-Left</th>
                      <th class="text-secondary opacity-7 align-middle">Temp</th>
                    </tr>
                  </thead>
                  <tbody>
                  {data.map((d) => (
                    <tr>
                      <td class="align-middle text-center text-sm">
                      <p class="text-xs font-weight-bold mb-0">{d.id}</p>
                      </td>
                      <td class="align-middle text-center text-sm">
                        <p class="text-xs font-weight-bold mb-0">{d.train}</p>
                      </td>
                      <td class="align-middle text-center text-sm">
                      <p class="text-xs font-weight-bold mb-0">{d.uniqueId}</p>
                      </td>
                      <td class="align-middle text-center">
                        <span class="text-secondary text-xs font-weight-bold">{d.axle_r}</span>
                      </td>
                      <td class="align-middle text-center text-sm">
                        <span class="badge badge-sm bg-gradient-success">
                        {d.temp_r}
                        </span>
                      </td>
                      <td class="align-middle text-center">
                        <span class="text-secondary text-xs font-weight-bold">{d.axle_l}</span>
                      </td>
                      <td class="align-middle text-center text-sm">
                        <span class="badge badge-sm bg-gradient-success">
                        {d.temp_l}
                        </span>
                      </td>
                    </tr>
                    ))}            
                  </tbody>
                </table>
     </>
  );
}
export default Home;