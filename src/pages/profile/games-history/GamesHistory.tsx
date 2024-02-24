import DataTable from "datatables.net-dt";
// import "datatables.net-dt/css/jquery.dataTables.css";
import "datatables.net-dt/css/dataTables.dataTables.css";
import { useEffect, useRef } from "react";
import GameHistoryItem from "./game-history-item/GameHistoryItem";
// import "./GamesHistory1.css";
// import * as DataTable from 'datatables.net';
import "./GamesHistory.css";
import 'datatables.net-buttons';
import 'datatables.net-responsive';


const GamesHistory: React.FC<any> = ({ gamesLog }) => {
  const tableRef = useRef<any>();

  useEffect(() => {
    const table: any = new DataTable(tableRef.current, {
      dom: "Bfrtip",
      buttons: ["copy", "csv", "excel", "pdf", "print"],
      lengthMenu: [
        [10, 25, 50, -1],
        [10, 25, 50, "All"],
      ],
      pageLength: 5,
      order: [],
      language: {
        url: "//cdn.datatables.net/plug-ins/1.10.25/i18n/English.json",
      },
      columnDefs: [{ target: 0, orderable: true }], // TODO: target 0 makansh
      rowCallback: function (row: any, data, index) {
        // Apply the dark theme to the row
        var cells = row.getElementsByTagName("td");
        for (var i = 0; i < cells.length; i++) {
          cells[i].style.backgroundColor = "black";
          cells[i].style.borderColor = "gray";
        }
      },
      responsive: true,
    });

    return () => {
      // Destroy the DataTable instance when the component unmounts
      table.destroy();
    };
  }, []); // Empty dependency array ensures that the effect runs only once on mount

  return (
    <table
      ref={tableRef}
      id="example"
      className="display"
      style={{ width: "100%" }}
    >
      <thead>
        <tr>
          <th>Player 1</th>
          <th>Player 1 Score</th>
          <th>Player 2 Score</th>
          <th>Player 2</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {gamesLog?.length &&
          gamesLog?.map((gameLog: any, index: number) => {
            const key = `game-${index}`;
            return <GameHistoryItem key={key} gameLog={gameLog} />;
          })}
      </tbody>
    </table>
  );
};

export default GamesHistory;
