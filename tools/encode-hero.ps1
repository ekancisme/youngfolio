param(
  [string]$InPath = "tmp/hero-source.mp4",
  [string]$OutPath = "public/hero-scrub.mp4",
  [int]$Gop = 6,
  [int]$Width = 1920,
  [int]$Crf = 20
)
$bin = "C:\Users\lethe\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-9.0.1-full_build\bin"
$ff = Join-Path $bin "ffmpeg.exe"
$scale = "scale=" + $Width + ":-2"
& $ff -y -i $InPath -c:v libx264 -preset slow -profile:v high -pix_fmt yuv420p -vf $scale -g $Gop -keyint_min $Gop -sc_threshold 0 -crf $Crf -movflags +faststart -an $OutPath
if ($LASTEXITCODE -ne 0) { throw "ffmpeg failed with exit code $LASTEXITCODE" }
