import { logger } from "./application/logging";
import { web } from "./application/web";

web.listen(9000, () => {
  logger.info("Listening on port 9000");
});
