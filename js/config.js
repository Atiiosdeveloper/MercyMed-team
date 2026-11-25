/* MercyMed – clinic settings.
   Team, prices, WhatsApp number and Instagram live here, in one place.
   Leave a value empty ("") while it is not confirmed: the website then shows
   a safe fallback instead of wrong information.
   Team data comes from the client presentation ("Our team" slide) and the
   client meeting with Dr. Lukas. */
window.MM_CONFIG = {
  // Clinic WhatsApp number, digits only with country code, e.g. "996555123456".
  // Empty: WhatsApp still opens with the message ready, and the visitor picks the chat.
  whatsappNumber: "",

  // Instagram account without "@". Empty: shown as "TBC".
  instagramHandle: "",

  // Prices as they should appear, e.g. "1 500 KGS" or "from 800 KGS".
  // Empty: the card shows "ask us on WhatsApp".
  prices: {
    consult: "",
    checkups: "",
    diagnostics: "",
    lab: "",
    documents: "",
    doula: ""
  },

  // Team: name, photo, role and a short bio in 3 languages.
  // bookable: true = shown in "Preferred doctor" in the booking form.
  team: [
    {
      name: "Mahabat Alieva", photo: "images/team/mahabat-alieva.jpg", bookable: true,
      role: { en: "Director / Doula", ru: "Директор / доула", ky: "Директор / доула" },
      bio: {
        en: "A Kyrgyz nurse and certified doula who started MercyMed's mobile clinics with Dr. Jonathan over 10 years ago. She runs birth preparation courses and supports families in pregnancy, birth and after birth.",
        ru: "Медсестра из Кыргызстана и сертифицированная доула. Более 10 лет назад вместе с д-ром Джонатаном начала выездные клиники MercyMed. Ведёт курсы подготовки к родам и поддерживает семьи во время беременности, родов и после них.",
        ky: "Кыргызстандык медайым жана сертификаты бар доула. 10 жылдан ашык мурун д-р Джонатан менен бирге MercyMed'дин көчмө клиникаларын баштаган. Төрөткө даярдоо курстарын өткөрөт жана үй-бүлөлөрдү кош бойлуулук, төрөт жана андан кийинки мезгилде колдойт."
      }
    },
    {
      name: "Dr. Jonathan Williams", photo: "images/team/jonathan-williams.jpg", bookable: true,
      role: { en: "Chief Doctor / Pediatrics", ru: "Главный врач / педиатрия", ky: "Башкы дарыгер / педиатрия" },
      bio: {
        en: "Our chief doctor and a pediatrician. Over 10 years ago he co-founded the mobile clinics that MercyMed grew out of.",
        ru: "Главный врач клиники и педиатр. Более 10 лет назад стал одним из основателей выездных клиник, из которых вырос MercyMed.",
        ky: "Клиниканын башкы дарыгери жана педиатр. 10 жылдан ашык мурун MercyMed өсүп чыккан көчмө клиникалардын негиздөөчүлөрүнүн бири болгон."
      }
    },
    {
      name: "Dr. Irina Pak", photo: "images/team/irina-pak.jpg", bookable: true,
      role: { en: "Pediatrics / Family Medicine", ru: "Педиатрия / семейная медицина", ky: "Педиатрия / үй-бүлөлүк медицина" },
      bio: {
        en: "A doctor from Kyrgyzstan who has worked with MercyMed for a long time. She cares for both children and adults.",
        ru: "Врач из Кыргызстана, давно работает в MercyMed. Принимает и детей, и взрослых.",
        ky: "Кыргызстандык дарыгер, MercyMed'де көптөн бери иштейт. Балдарды да, чоңдорду да кабыл алат."
      }
    },
    {
      name: "Dr. Nasyikat Dononbaeva", photo: "images/team/nasyikat-dononbaeva.jpg", bookable: true,
      role: { en: "Internal Medicine / Pulmonology", ru: "Терапия / пульмонология", ky: "Терапия / пульмонология" },
      bio: {
        en: "A doctor from Kyrgyzstan who has worked with MercyMed for a long time. She cares for adult patients, including lung and breathing problems.",
        ru: "Врач из Кыргызстана, давно работает в MercyMed. Принимает взрослых пациентов, в том числе с заболеваниями лёгких и дыхания.",
        ky: "Кыргызстандык дарыгер, MercyMed'де көптөн бери иштейт. Чоң кишилерди, анын ичинде өпкө жана дем алуу көйгөйлөрү менен кабыл алат."
      }
    },
    {
      name: "Dr. Nabat Gasimova", photo: "images/team/nabat-gasimova.jpg", bookable: true,
      role: { en: "Pediatrics / Intensive Care", ru: "Педиатрия / интенсивная терапия", ky: "Педиатрия / интенсивдүү терапия" },
      bio: {
        en: "A doctor from Kyrgyzstan who has worked with MercyMed for a long time. She is a pediatrician with intensive care experience.",
        ru: "Врач из Кыргызстана, давно работает в MercyMed. Педиатр с опытом в интенсивной терапии.",
        ky: "Кыргызстандык дарыгер, MercyMed'де көптөн бери иштейт. Интенсивдүү терапия тажрыйбасы бар педиатр."
      }
    },
    {
      name: "Dr. Nancy Yau", photo: "images/team/nancy-yau.jpg", bookable: true,
      role: { en: "Pediatrics", ru: "Педиатрия", ky: "Педиатрия" },
      bio: {
        en: "A pediatrician in our international team. She also consults in Chinese.",
        ru: "Педиатр в нашей международной команде. Также консультирует на китайском языке.",
        ky: "Эл аралык командабыздагы педиатр. Кытай тилинде да кеңеш берет."
      }
    },
    {
      name: "Dr. Lukas Meyer-Landholt", photo: "images/team/lukas-meyer-landholt.jpg", bookable: true,
      role: { en: "Pediatrics / Oncology", ru: "Педиатрия / онкология", ky: "Педиатрия / онкология" },
      bio: {
        en: "A pediatrician and pediatric oncologist from Switzerland, who also sees children with blood disorders. He consults in English, German and French.",
        ru: "Педиатр и детский онколог из Швейцарии, также принимает детей с заболеваниями крови. Консультирует на английском, немецком и французском.",
        ky: "Швейцариядан келген педиатр жана балдар онкологу, кан оорулары бар балдарды да кабыл алат. Англис, немис жана француз тилдеринде кеңеш берет."
      }
    },
    {
      name: "Madison Smith", photo: "images/team/madison-smith.jpg", bookable: true,
      role: { en: "Physical Therapist", ru: "Физиотерапевт", ky: "Физиотерапевт" },
      bio: {
        en: "A physical therapist in our international team.",
        ru: "Физиотерапевт в нашей международной команде.",
        ky: "Эл аралык командабыздагы физиотерапевт."
      }
    },
    {
      name: "Dr. Simbat Sadyrbaeva", photo: "images/team/simbat-sadyrbaeva.jpg", bookable: true,
      role: { en: "Gynecology", ru: "Гинекология", ky: "Гинекология" },
      bio: {
        en: "Our gynecologist from Kyrgyzstan, caring for women's health, including pregnant patients.",
        ru: "Наш гинеколог из Кыргызстана: заботится о женском здоровье, в том числе ведёт беременных пациенток.",
        ky: "Кыргызстандык гинекологубуз: аялдардын ден соолугуна, анын ичинде кош бойлуу бейтаптарга кам көрөт."
      }
    },
    {
      name: "Nargiza Islamova", photo: "images/team/nargiza-islamova.jpg", photoIsNotPortrait: true, bookable: false,
      role: { en: "Ultrasound", ru: "УЗИ", ky: "УЗИ" },
      bio: {
        en: "Our ultrasound specialist from Kyrgyzstan. Ultrasound is arranged after a consultation with our doctor.",
        ru: "Наш специалист по УЗИ из Кыргызстана. УЗИ назначается после консультации врача.",
        ky: "Кыргызстандык УЗИ адисибиз. УЗИ дарыгердин консультациясынан кийин дайындалат."
      }
    }
  ]
};
