import { router } from "../__internals/router"
import { publicProcedure } from "../procedures"

export const authRouter = router({
  getDatabaseSyncStatus: publicProcedure.query(({ c, ctx }) => {
    return c.json({ status: "success" })
  }),
})
