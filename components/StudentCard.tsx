export default async function StudentCard({ student }: { student: any }) {
  return (
    <div className="border border-black p-4 w-64">
      <p>{student.studentId}</p>
      <p>{student.fullName}</p>
    </div>
  );
}
