import Link from "next/link";
import { notFound } from "next/navigation";
import PlaceholderBlock from "@/components/PlaceholderBlock";
import { competitions, getCompetitionById, EXTERNAL_APPLY_URL } from "@/lib/data";

function formatDate(dateStr) {
  const [y, m, d] = dateStr.split("-");
  return `${y}년 ${m}월 ${d}일`;
}

export const instant = false;

export function generateStaticParams() {
  return competitions.map((c) => ({ id: c.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const competition = getCompetitionById(id);

  if (!competition) {
    return { title: "대회 정보 없음 | 오산시 수영연맹" };
  }

  return {
    title: `${competition.title} | 오산시 수영연맹`,
    description: competition.summary,
  };
}

function SectionTitle({ children }) {
  return <h2 className="text-2xl font-black tracking-tight">{children}</h2>;
}

function BulletList({ items }) {
  return (
    <ul className="mt-4 space-y-2">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-base text-black/70">
          <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
          {item}
        </li>
      ))}
    </ul>
  );
}

function TableWrap({ children }) {
  return (
    <div className="mt-4 overflow-x-auto rounded-2xl border border-black/10">
      <table className="w-full min-w-[480px] text-left text-sm">{children}</table>
    </div>
  );
}

function Th({ children }) {
  return (
    <th className="whitespace-nowrap bg-black px-4 py-3 text-xs font-bold uppercase tracking-wider text-white">
      {children}
    </th>
  );
}

function Td({ children, strong = false }) {
  return (
    <td className={`px-4 py-3 align-top ${strong ? "font-bold text-black" : "text-black/70"}`}>
      {children}
    </td>
  );
}

export default async function CompetitionDetailPage({ params }) {
  const { id } = await params;
  const competition = getCompetitionById(id);

  if (!competition) {
    notFound();
  }

  const isDetailed = Boolean(competition.eventsByDivision);
  const applyUrl = competition.applyUrl ?? EXTERNAL_APPLY_URL;

  return (
    <>
      <section className="relative flex h-[45vh] min-h-[320px] items-center justify-center bg-black text-white">
        <PlaceholderBlock
          label={competition.category}
          tone="dark"
          className="absolute inset-0 h-full w-full opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10" />
        <div className="relative z-10 max-w-3xl px-6 text-center">
          <span className="inline-block rounded-full bg-brand px-4 py-1 text-xs font-bold uppercase tracking-widest text-white">
            {competition.category}
          </span>
          <h1 className="mt-5 break-keep text-3xl font-black leading-tight tracking-tight sm:text-5xl">
            {competition.title}
          </h1>
          <p className="mt-4 text-sm text-white/60 sm:text-base">
            {competition.dateLabel ?? formatDate(competition.date)} · {competition.location}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-16 sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/competitions"
            className="inline-flex items-center gap-1 text-sm font-bold text-black/50 transition-colors hover:text-brand"
          >
            ← 대회일정 목록으로
          </Link>

          {competition.documentUrl && (
            <a
              href={competition.documentUrl}
              download
              className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-brand-dark"
            >
              대회요강 다운로드 (PDF)
              <span aria-hidden="true">↓</span>
            </a>
          )}
        </div>

        {/* 개요 */}
        <div className="mt-8 grid gap-6 rounded-2xl border border-black/10 p-6 sm:grid-cols-2 sm:p-8 lg:grid-cols-3">
          <div>
            <dt className="text-xs font-bold uppercase tracking-widest text-brand">일시</dt>
            <dd className="mt-2 text-lg font-bold text-black">
              {competition.dateLabel ?? formatDate(competition.date)}
            </dd>
          </div>
          {competition.timeLabel && (
            <div>
              <dt className="text-xs font-bold uppercase tracking-widest text-brand">경기시간</dt>
              <dd className="mt-2 text-base font-bold text-black">{competition.timeLabel}</dd>
            </div>
          )}
          <div>
            <dt className="text-xs font-bold uppercase tracking-widest text-brand">장소</dt>
            <dd className="mt-2 text-lg font-bold text-black">{competition.location}</dd>
          </div>
          {competition.organizer && (
            <div>
              <dt className="text-xs font-bold uppercase tracking-widest text-brand">주최 / 주관</dt>
              <dd className="mt-2 text-base font-bold text-black">{competition.organizer}</dd>
            </div>
          )}
          {competition.capacity && (
            <div>
              <dt className="text-xs font-bold uppercase tracking-widest text-brand">참가인원</dt>
              <dd className="mt-2 text-base font-bold text-black">{competition.capacity}</dd>
            </div>
          )}
        </div>

        {/* 대회 소개 */}
        <div className="mt-10">
          <SectionTitle>대회 소개</SectionTitle>
          <p className="mt-4 text-base leading-relaxed text-black/60">{competition.description}</p>
        </div>

        {isDetailed ? (
          <>
            {/* 참가구분 */}
            {competition.participantDivisions && (
              <div className="mt-10">
                <SectionTitle>참가구분</SectionTitle>
                <div className="mt-4 grid gap-6 sm:grid-cols-2">
                  <div>
                    <p className="text-sm font-bold text-brand">학생부</p>
                    <TableWrap>
                      <thead>
                        <tr>
                          <Th>구분</Th>
                          <Th>대상</Th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-black/10">
                        {competition.participantDivisions.student.map((row) => (
                          <tr key={row.label}>
                            <Td strong>{row.label}</Td>
                            <Td>{row.note}</Td>
                          </tr>
                        ))}
                      </tbody>
                    </TableWrap>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-brand">성인부</p>
                    <TableWrap>
                      <thead>
                        <tr>
                          <Th>구분</Th>
                          <Th>대상</Th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-black/10">
                        {competition.participantDivisions.adult.map((row) => (
                          <tr key={row.label}>
                            <Td strong>{row.label}</Td>
                            <Td>{row.note}</Td>
                          </tr>
                        ))}
                      </tbody>
                    </TableWrap>
                  </div>
                </div>
              </div>
            )}

            {/* 참가자격 */}
            <div className="mt-10">
              <SectionTitle>참가 자격</SectionTitle>
              <BulletList items={competition.eligibility} />
            </div>

            {/* 경기종목 안내 */}
            <div className="mt-10">
              <SectionTitle>경기종목 안내</SectionTitle>
              <TableWrap>
                <thead>
                  <tr>
                    <Th>구분</Th>
                    <Th>종목</Th>
                    <Th>비고</Th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/10">
                  {competition.eventsByDivision.map((row) => (
                    <tr key={row.group}>
                      <Td strong>{row.group}</Td>
                      <Td>{row.strokes}</Td>
                      <Td>{row.note}</Td>
                    </tr>
                  ))}
                </tbody>
              </TableWrap>
            </div>

            {/* 단체전 규정 */}
            {competition.teamRelayRules && (
              <div className="mt-10">
                <SectionTitle>단체전 규정</SectionTitle>
                <BulletList items={competition.teamRelayRules} />
              </div>
            )}

            {/* 경기순서 */}
            {competition.schedule && (
              <div className="mt-10">
                <SectionTitle>경기순서</SectionTitle>
                <TableWrap>
                  <thead>
                    <tr>
                      <Th>구분</Th>
                      <Th>오전</Th>
                      <Th>오후</Th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/10">
                    {competition.schedule.map((row) => (
                      <tr key={row.day}>
                        <Td strong>{row.day}</Td>
                        <Td>{row.morning}</Td>
                        <Td>{row.afternoon}</Td>
                      </tr>
                    ))}
                  </tbody>
                </TableWrap>
                {competition.scheduleNote && (
                  <p className="mt-3 text-sm text-black/50">{competition.scheduleNote}</p>
                )}
              </div>
            )}

            {/* 참가신청 및 접수 */}
            {competition.registration && (
              <div className="mt-10">
                <SectionTitle>참가 신청 및 접수</SectionTitle>
                <div className="mt-4 grid gap-6 rounded-2xl border border-black/10 p-6 sm:p-8">
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-widest text-brand">접수기간</dt>
                    <dd className="mt-2 text-base font-bold text-black">
                      {competition.registration.period}
                    </dd>
                  </div>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <dt className="text-xs font-bold uppercase tracking-widest text-brand">출전종목</dt>
                      <dd className="mt-2 text-base text-black/70">{competition.registration.eventLimit}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-bold uppercase tracking-widest text-brand">참가비</dt>
                      <dd className="mt-2 text-base text-black/70">{competition.registration.fee}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-bold uppercase tracking-widest text-brand">팀 인원</dt>
                      <dd className="mt-2 text-base text-black/70">{competition.registration.teamRule}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-bold uppercase tracking-widest text-brand">
                        등록 학생선수 번외참가
                      </dt>
                      <dd className="mt-2 text-base text-black/70">
                        {competition.registration.studentAthleteNote}
                      </dd>
                    </div>
                  </div>
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-widest text-brand">접수 사이트</dt>
                    <dd className="mt-2 text-base font-bold">
                      <a
                        href={applyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-brand underline-offset-4 hover:underline"
                      >
                        {applyUrl.replace(/^https?:\/\//, "")}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-widest text-brand">입금계좌</dt>
                    <dd className="mt-2 text-base font-bold text-black">
                      {competition.registration.bankAccount}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-widest text-brand">문의</dt>
                    <dd className="mt-2 space-y-1 text-base text-black/70">
                      {competition.registration.contacts.map((c) => (
                        <p key={c.role}>
                          <span className="font-bold text-black">{c.role}</span> · {c.name} · {c.phone}
                        </p>
                      ))}
                      <p className="text-sm text-black/50">{competition.registration.contactHours}</p>
                    </dd>
                  </div>
                </div>
              </div>
            )}

            {/* 참가비 입금 안내 */}
            {competition.paymentNotes && (
              <div className="mt-10">
                <SectionTitle>참가비 입금 안내</SectionTitle>
                <BulletList items={competition.paymentNotes} />
              </div>
            )}

            {/* 경기운영 및 채점 */}
            {competition.operationNotes && (
              <div className="mt-10">
                <SectionTitle>경기운영 및 채점</SectionTitle>
                <BulletList items={competition.operationNotes} />
              </div>
            )}

            {/* 수영복 규정 */}
            {competition.swimwearRules && (
              <div className="mt-10">
                <SectionTitle>수영복 규정</SectionTitle>
                <BulletList items={competition.swimwearRules} />
              </div>
            )}

            {/* 시상 */}
            {competition.awards && (
              <div className="mt-10">
                <SectionTitle>시상</SectionTitle>
                <TableWrap>
                  <thead>
                    <tr>
                      <Th>구분</Th>
                      <Th>학생부</Th>
                      <Th>성인부</Th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/10">
                    {competition.awards.rows.map((row) => (
                      <tr key={row.rank}>
                        <Td strong>{row.rank}</Td>
                        <Td>{row.student}</Td>
                        <Td>{row.adult}</Td>
                      </tr>
                    ))}
                  </tbody>
                </TableWrap>
                {competition.awards.note && (
                  <p className="mt-3 text-sm text-black/50">{competition.awards.note}</p>
                )}
              </div>
            )}

            {/* 안전대책 */}
            {competition.safety && (
              <div className="mt-10">
                <SectionTitle>안전대책</SectionTitle>
                <BulletList items={competition.safety} />
              </div>
            )}
          </>
        ) : (
          <>
            {/* 참가 자격 (기본 템플릿) */}
            <div className="mt-10">
              <SectionTitle>참가 자격</SectionTitle>
              <BulletList items={competition.eligibility} />
            </div>

            {/* 종목 안내 (기본 템플릿) */}
            <div className="mt-10">
              <SectionTitle>종목 안내</SectionTitle>
              <div className="mt-4 flex flex-wrap gap-2">
                {competition.events.map((event) => (
                  <span
                    key={event}
                    className="rounded-full border border-black/10 px-4 py-2 text-sm font-semibold text-black/70"
                  >
                    {event}
                  </span>
                ))}
              </div>
            </div>
          </>
        )}

        <div className="mt-14 flex flex-col items-center gap-4 rounded-2xl bg-black p-10 text-center text-white">
          <p className="text-lg font-bold">{competition.title}에 참가하시겠습니까?</p>
          <p className="text-sm text-white/50">대회 신청은 외부 접수 사이트에서 진행됩니다.</p>
          <a
            href={applyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center justify-center rounded-full bg-brand px-8 py-4 text-base font-bold text-white transition-transform hover:scale-105 hover:bg-brand-dark"
          >
            대회 신청하기 →
          </a>
        </div>
      </section>
    </>
  );
}
