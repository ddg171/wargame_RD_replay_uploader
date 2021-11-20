export function debugLog(...args:any[]):void{
    if(process.env.mode === "production") return
    console.log("[debug]",...args)
}