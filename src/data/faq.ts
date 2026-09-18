/**
 * Homepage FAQ.
 *
 * Questions are the ones first-time filers actually ask on WhatsApp, so
 * answering them here saves a round trip and gives search engines real
 * content to index.
 */

export interface FaqItem {
  q: string;
  a: string;
}

export const HOME_FAQ: Record<'bm' | 'en', FaqItem[]> = {
  bm: [
    {
      q: 'Saya perlu fail cukai ke?',
      a: 'Jika pendapatan tahunan anda melebihi RM34,000 selepas potongan KWSP (lebih kurang RM2,833 sebulan), anda wajib mendaftar dan memfailkan cukai pendapatan. Jika anda sudah ada nombor cukai, anda perlu fail setiap tahun walaupun tiada cukai perlu dibayar.',
    },
    {
      q: 'Apa beza Borang BE dan Borang B?',
      a: 'Borang BE untuk individu yang hanya ada pendapatan penggajian. Borang B untuk individu yang ada pendapatan perniagaan, termasuk freelance, e-hailing atau jualan online, walaupun anda juga makan gaji.',
    },
    {
      q: 'Apa dokumen yang saya perlu sediakan?',
      a: 'Untuk pekerja bergaji: Penyata EA daripada majikan dan resit pelepasan (insurans, perubatan, buku, gaya hidup dan lain-lain). Untuk perniagaan: rekod jualan, perbelanjaan dan penyata bank. Tidak lengkap pun tidak mengapa, kami akan bantu susun.',
    },
    {
      q: 'Berapa lama proses pemfailan?',
      a: 'Kebanyakan Borang BE siap dalam 1 hingga 3 hari bekerja selepas dokumen lengkap diterima. Borang B dan cukai syarikat bergantung kepada kerumitan rekod, biasanya 5 hingga 10 hari bekerja.',
    },
    {
      q: 'Bagaimana cara bayar dan berapa kosnya?',
      a: 'Kami sebut harga dahulu melalui WhatsApp berdasarkan kes anda. Harga bermula dari RM1,950 setiap tahun taksiran dan bergantung kepada kerumitan rekod anda. Anda hanya bayar selepas bersetuju dengan sebut harga, tiada caj tersembunyi.',
    },
  ],
  en: [
    {
      q: 'Do I need to file taxes?',
      a: 'If your annual income exceeds RM34,000 after EPF deductions (roughly RM2,833 a month), you are required to register and file income tax. If you already have a tax number, you must file every year even if no tax is payable.',
    },
    {
      q: 'What is the difference between Borang BE and Borang B?',
      a: 'Borang BE is for individuals with employment income only. Borang B is for individuals with any business income, including freelance, e-hailing or online sales, even if you are also salaried.',
    },
    {
      q: 'What documents do I need?',
      a: 'Salaried: your EA statement from your employer and receipts for reliefs (insurance, medical, books, lifestyle and so on). Business: sales and expense records plus bank statements. Incomplete is fine, we will help you organise them.',
    },
    {
      q: 'How long does filing take?',
      a: 'Most Borang BE filings are done within 1 to 3 working days once your documents are in. Borang B and corporate returns depend on the state of your records, usually 5 to 10 working days.',
    },
    {
      q: 'How do I pay and what does it cost?',
      a: 'We quote first on WhatsApp based on your case. Fees start from RM1,950 per year of assessment and depend on how complex your records are. You only pay after agreeing to the quote, with no hidden charges.',
    },
  ],
};
