import { Card, CardContent, CardHeader, Grid } from "@mui/material";
import { useContext } from "react";
import { Layout } from "../components/layouts";
import { EntryList, NewEntry } from "../components/ui";
import { EntriesContext } from "../context/entries/EntriesContext";
import { status } from "../context/constants";

export default function Home() {

  const { entries } = useContext(EntriesContext)

  // const pending = useMemo(() => entries.filter((entry) => {
  //   return entry.status == status.pending
  // }), [entries]);

  // const completed = useMemo(() =>
  //   entries.filter((entry) => {
  //     return entry.status == status.finished
  //   }), [entries]);

  // const inProgress = useMemo(() => entries.filter((entry) => {
  //   return entry.status == status.inProgress
  // }), [entries]);

  return (
    <Layout title="Home - OpenJira">
      <Grid container spacing={2} sx={{ padding: '15px 15px' }}>

        <Grid item xs={12} sm={4}>
          <Card sx={{ height: 'calc(100vh - 100px)' }}>
            <CardHeader title='Pendientes' />
            <NewEntry/>
            <CardContent>
              {/* Agregar una nueva entrada */}
              <EntryList status={status.pending} />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card sx={{ height: 'calc(100vh - 100px)' }}>
            <CardHeader title='En Progreso' />
            <CardContent>
              <EntryList status={status.inProgress} />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card sx={{ height: 'calc(100vh - 100px)' }}>
            <CardHeader title='Completadas' />
            <CardContent>
              <EntryList status={status.finished} />
            </CardContent>
          </Card>
        </Grid>

      </Grid>
    </Layout>
  )
}
