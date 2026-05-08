import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const MAX_SUPPLY = 1_000_000n * (10n ** 18n);

export default buildModule("TokenModule", (m) => {
   const token = m.contract("HToken", [MAX_SUPPLY]);
  return { token };
});
