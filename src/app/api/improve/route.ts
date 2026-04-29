import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { projectName, userDescription, language, type, principles, approach } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    console.log(`Arch-CV Alchemy: ${type === 'philosophy' ? 'Manifesto' : projectName} işleniyor...`);

    const modelName = "models/gemini-3-flash-preview";
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/${modelName}:generateContent?key=${apiKey}`;

    let prompt = "";
    if (type === 'philosophy') {
      prompt = `Sen bir Senior Software Architect'sin. Kullanıcının şu mühendislik prensiplerini ve yaklaşımını alarak etkileyici, vizyoner ve profesyonel bir "Mühendislik Manifestosu" (Engineering Manifesto) oluştur. 
      Prensipler: "${principles}"
      Yaklaşım: "${approach}"
      
      Kurallar:
      1. Birinci tekil şahıs kullan (Örn: "İnanıyorum", "Benimserim").
      2. Teknik derinliği ve liderlik vasıflarını vurgula.
      3. Maksimum 3-4 etkileyici cümle olsun.
      4. Sadece manifestoyu döndür, açıklama yapma.`;
    } else {
      prompt = `Sen bir Senior Software Architect'sin. Kullanıcının "${projectName}" adlı projesi için yazdığı şu ham açıklamayı profesyonel bir CV maddesine dönüştür. 
      Teknoloji: ${language}. 
      Açıklama: "${userDescription}". 
      Sadece geliştirilmiş metni döndür, teknik derinliği yüksek 2 kısa cümle olsun.`;
    }

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }]
      })
    });

    const data = await response.json();

    if (data.error) {
      console.error("Google API Hatası:", data.error);
      return NextResponse.json({ error: data.error.message }, { status: 500 });
    }

    const improvedText = data.candidates[0].content.parts[0].text;
    console.log("Alchemy Başarılı! Metin üretildi.");

    return NextResponse.json({ improvedText });
  } catch (error: any) {
    console.error("ARCH-CV KRİTİK HATA:", error);
    return NextResponse.json({ error: "Simya motorunda bir dişli takıldı." }, { status: 500 });
  }
}